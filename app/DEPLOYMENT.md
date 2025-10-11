# Configuração de Deploy - Microfrontends

## Ambientes Configurados

### Desenvolvimento (Docker Local)
- **Dashboard**: `http://localhost:8085`
- **Home**: `http://localhost:8086`
- **App Principal**: `http://localhost:8083`

### Produção (Vercel)
- **Dashboard**: `https://mfe-dashboard-cyan.vercel.app/`
- **Home**: `https://mfe-home-lovat.vercel.app/`
- **App Principal**: [URL do seu deploy]

## Como Funciona

O sistema automaticamente detecta o ambiente baseado na variável `NODE_ENV`:

- **Desenvolvimento**: `NODE_ENV=development` → Usa URLs locais do Docker
- **Produção**: `NODE_ENV=production` → Usa URLs do Vercel

## Comandos de Build

### Desenvolvimento
```bash
npm run start
# ou
NODE_ENV=development npm run start
```

### Produção
```bash
npm run build
# ou
NODE_ENV=production npm run build
```

## Estrutura dos Microfrontends

Cada microfrontend deve expor:
- `remoteEntry.js` - Arquivo principal do Module Federation
- Estilos CSS incluídos no bundle

## URLs dos Microfrontends em Produção

- **Dashboard**: https://mfe-dashboard-cyan.vercel.app/remoteEntry.js
- **Home**: https://mfe-home-lovat.vercel.app/remoteEntry.js

## Troubleshooting

Se os microfrontends não carregarem em produção:

1. Verifique se os URLs estão corretos
2. Confirme se os microfrontends estão deployados
3. Verifique se o `remoteEntry.js` está acessível
4. Confirme se os CORS estão configurados corretamente
