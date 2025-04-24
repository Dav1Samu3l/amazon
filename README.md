# 📋 README - Amazon Scraper Project

## 🚀 Visão Geral do Projeto

Este projeto consiste em duas partes principais:
1. **Backend**: API de scraping da Amazon (Node.js/Express)
2. **Frontend**: Aplicação React com Vite

## 📂 Estrutura de Diretórios

```
amazon/
├── amazon-scraper/    # Backend API
└── amazon-vite/       # Frontend React
    └── meu-projeto-minimal/  # Projeto Vite
```

## ⚙️ Configuração e Execução

### 🔙 Backend (API de Scraping)

1. Acesse o diretório:
   ```bash
   cd amazon-scraper
   ```

2. Instale as dependências (se necessário):
   ```bash
   bun install
   # ou
   npm install
   ```

3. Execute o servidor:
   ```bash
   bun run index.ts
   # ou com Node.js
   npx ts-node index.ts
   ```

   O servidor iniciará em: `http://localhost:3000`

### 🖥️ Frontend (React/Vite)

1. Acesse o diretório do projeto Vite:
   ```bash
   cd amazon-vite/meu-projeto-minimal
   ```

2. Instale as dependências (se necessário):
   ```bash
   npm install
   ```

3. Execute a aplicação:
   ```bash
   npm run dev
   ```

   O frontend iniciará em: `http://localhost:5173`

## 🌐 Acessando os Serviços

- **API Backend**: 
  - Endpoint de saúde: `http://localhost:3000/health`
  - Endpoint de scraping: `http://localhost:3000/api/scrape?keyword=produto`

- **Frontend**:
  - Aplicação: `http://localhost:5173`

## 🛠️ Comandos Úteis

### Backend
| Comando | Descrição |
|---------|-----------|
| `bun run index.ts` | Inicia o servidor backend |
| `bun add <pacote>` | Adiciona uma dependência |

### Frontend
| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Cria build de produção |
| `npm run preview` | Visualiza build localmente |
| `npm run lint` | Executa análise de código |

## ⚠️ Solução de Problemas Comuns

1. **Erros de CORS**:
   - Verifique se o backend está rodando
   - Confira se o frontend está configurado para acessar a URL correta da API

2. **Comandos não encontrados**:
   - Certifique-se de estar no diretório correto
   - Verifique se as dependências foram instaladas

3. **Problemas com OneDrive**:
   - Se encontrar erros de caminho, considere mover o projeto para fora do OneDrive

## 📌 Dicas Importantes

1. Execute o backend antes do frontend
2. Mantenha ambos servidores rodando durante o desenvolvimento
3. Para produção, construa o frontend (`npm run build`) e sirva os arquivos estáticos

Este projeto foi configurado com:
- Backend: Bun + Express + TypeScript
- Frontend: Vite + React 19