# Deploy na Vercel - App Principal

## Pré-requisitos

1. Conta na Vercel
2. Projeto conectado ao repositório Git
3. Microfrontends (dashboard e home) já deployados

## Configuração na Vercel

### 1. Configurações de Build

No painel da Vercel, configure:

- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node Version**: 20.x

### 2. Root Directory

**IMPORTANTE**: Se estiver deployando apenas a pasta `app`, configure:
- **Root Directory**: `app`

### 3. Variáveis de Ambiente

Não é necessário configurar variáveis de ambiente, pois os URLs dos microfrontends estão hardcoded no arquivo `config/remotes.js`.

### 4. Configurações no vercel.json

O arquivo `vercel.json` já está configurado com:
- Rewrites para SPA (Single Page Application)
- Headers CORS
- Cache-Control otimizado

## Passo a Passo

1. **Instalar dependências localmente** (para testar):
   ```bash
   cd app
   npm install
   ```

2. **Testar build local**:
   ```bash
   npm run build
   ```

3. **Fazer commit e push**:
   ```bash
   git add .
   git commit -m "Configure Vercel deployment"
   git push origin main
   ```

4. **Deploy na Vercel**:
   - Acesse https://vercel.com
   - Importe o projeto
   - Configure conforme descrito acima
   - Clique em "Deploy"

## Troubleshooting

### Erro 404: NOT_FOUND

**Solução**: Verifique se:
- O arquivo `vercel.json` está presente
- O comando de build está correto
- O diretório `dist` está sendo gerado corretamente

### Tela Branca

**Solução**: Verifique se:
- Os microfrontends (dashboard e home) estão deployados e acessíveis
- Os URLs no arquivo `config/remotes.js` estão corretos
- Verifique o console do navegador para erros

### Erro de CORS

**Solução**: Verifique se:
- Os headers CORS estão configurados no `vercel.json`
- Os microfrontends permitem requisições do domínio do app principal

## URLs dos Microfrontends

Certifique-se que estes URLs estão acessíveis:
- Dashboard: https://mfe-dashboard-cyan.vercel.app/remoteEntry.js
- Home: https://mfe-home-lovat.vercel.app/remoteEntry.js

## Verificação Pós-Deploy

Após o deploy, verifique:

1. Acesse o URL do app na Vercel
2. Teste as rotas:
   - `/` - Página inicial
   - `/dashboard` - Dashboard
   - `/home` - Home
3. Verifique o console do navegador para erros
4. Confirme se os microfrontends estão carregando

## Comandos Úteis

```bash
# Instalar dependências
npm install

# Build de produção
npm run build

# Rodar localmente (desenvolvimento)
npm run start

# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

