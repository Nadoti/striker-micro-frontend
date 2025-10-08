# Dockerfile para o microfrontend Carrinho
FROM node:18-alpine

# Instalar curl para health checks
RUN apk add --no-cache curl

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci --include=dev

# Instalar webpack-cli globalmente como fallback
RUN npm install -g webpack-cli

# Copiar código fonte
COPY . .

# Expor porta
EXPOSE 8086

# Comando para iniciar o servidor de desenvolvimento usando npx
CMD ["npx", "webpack", "serve", "--config", "config/webpack.dev.js"]
