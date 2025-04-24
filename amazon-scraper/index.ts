import express from 'express';
import type { Request, Response } from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import cors from 'cors';

// Configuração inicial
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Restringe a origens específicas
  methods: ['GET'] // Apenas métodos necessários
}));

// Headers de segurança adicionais
app.use((req, res, next) => {
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  next();
});

// Função para extrair dados do produto
interface AmazonProduct {
  title: string;
  rating: string;
  reviews: string;
  image: string;
}

const extractProductData = (item: Element): AmazonProduct => {
  const getTextContent = (selector: string) => 
    item.querySelector(selector)?.textContent?.trim() || 'N/A';

  return {
    title: getTextContent('.s-title span') || 
           getTextContent('.a-text-normal') || 
           getTextContent('h2 a') || 'No title',
    rating: getTextContent('.a-icon-star-small'),
    reviews: getTextContent('.a-size-small .a-link-normal'),
    image: item.querySelector('img')?.src || 'No image'
  };
};

// Rota de scraping
app.get('/api/scrape', async (req: Request, res: Response) => {
  try {
    // Validação de entrada
    const keyword = req.query.keyword as string;
    if (!keyword?.trim()) {
      return res.status(400).json({ error: 'Keyword is required' });
    }

    // Configuração do request para a Amazon
    const amazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': 'https://www.google.com/'
    };

    // Request para a Amazon
    const { data } = await axios.get(amazonUrl, { headers });
    const dom = new JSDOM(data);
    const document = dom.window.document;

    // Processamento dos resultados
    const products = Array.from(document.querySelectorAll('.s-result-item'))
      .map(extractProductData)
      .filter(product => product.title !== 'No title'); // Filtra resultados inválidos

    // Cache control para evitar abuso
    res.set('Cache-Control', 'public, max-age=3600'); // 1 hora de cache
    return res.json(products);

  } catch (error) {
    console.error('Scraping error:', error);
    return res.status(500).json({ 
      error: 'Failed to scrape data',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Rota de saúde
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Scraper endpoint: http://localhost:${PORT}/api/scrape?keyword=product`);
});