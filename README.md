#  Amazon Product Scraper API

Um serviço de backend que faz scraping de produtos da Amazon com base em uma palavra-chave de pesquisa.

##  Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) (v18 ou superior) ou [Bun](https://bun.sh/) (v1.0 ou superior)
- npm/yarn/pnpm (se usar Node.js)

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/amazon-scraper.git
   cd amazon-scraper
   ```

2. **Instale as dependências**

   Com Bun (recomendado):
   ```bash
   bun install
   ```

   Com npm:
   ```bash
   npm install
   ```

   Com yarn:
   ```bash
   yarn install
   ```

### Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis (opcional):

```env
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### Execução

**Modo desenvolvimento (com reload automático):**
```bash
bun --watch src/index.ts
# ou com npm
npm run dev
```

**Modo produção:**
```bash
bun src/index.ts
# ou com npm
npm start
```

## 🌐 Endpoints

- `GET /api/scrape?keyword={produto}` - Retorna lista de produtos
  ```bash
  curl "http://localhost:3000/api/scrape?keyword=iphone"
  ```

- `GET /health` - Verifica status do serviço
  ```bash
  curl "http://localhost:3000/health"
  ```

## 🛠️ Tecnologias Utilizadas

- [Bun](https://bun.sh/) (Runtime JavaScript)
- [Express](https://expressjs.com/) (Framework web)
- [Axios](https://axios-http.com/) (HTTP client)
- [JSDOM](https://github.com/jsdom/jsdom) (Scraping)
- [CORS](https://github.com/expressjs/cors) (Middleware)

## ⚠️ Limitações e Considerações

1. O scraping pode violar os Termos de Serviço da Amazon
2. A Amazon pode bloquear requisições frequentes
3. A estrutura do HTML da Amazon pode mudar, quebrando o scraper
4. Use apenas para fins educacionais

## 📄 Licença

MIT