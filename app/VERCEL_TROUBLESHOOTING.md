# Troubleshooting - Erro 404 na Vercel

## Problema: Status Code 404 Not Found

Se você está vendo o erro:
```
https://striker-micro-frontend.vercel.app/
Status Code: 404 Not Found
```

### ✅ Soluções

#### 1. Verificar Root Directory

**Problema mais comum**: A Vercel está tentando buildar a raiz do projeto, mas o código está em `app/`.

**Solução**:
1. Acesse https://vercel.com/[seu-usuario]/striker-micro-frontend/settings/general
2. Em "Root Directory", configure: `app`
3. Salve e redeploy

#### 2. Verificar Build Command

Certifique-se que as configurações estão corretas:

```
Framework Preset: Other
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Root Directory: app  ← IMPORTANTE!
Node Version: 20.x
```

#### 3. Verificar se o Build Funciona Localmente

Teste o build localmente antes de fazer deploy:

```bash
cd app
npm install
npm run build
```

Se o build falhar localmente, corrija os erros antes de fazer deploy.

#### 4. Verificar Logs de Build na Vercel

1. Acesse o painel da Vercel
2. Vá em "Deployments"
3. Clique no último deployment
4. Vá em "Building" para ver os logs

Procure por erros como:
- `Module not found`
- `Cannot find module`
- Erros de compilação do webpack

#### 5. Verificar se os Arquivos foram Gerados

Após o build, verifique se a pasta `dist` foi criada com:
- `index.html`
- Arquivos JavaScript (.js)
- `remoteEntry.js` (para Module Federation)

#### 6. Forçar Redeploy

Às vezes a Vercel precisa de um novo deploy:

1. Vá em "Deployments"
2. Clique no deployment atual
3. Clique em "Redeploy"
4. Selecione "Redeploy with existing Build Cache"

#### 7. Limpar Cache e Redeploy

Se ainda não funcionar:

1. Vá em "Deployments"
2. Clique no deployment atual
3. Clique em "Redeploy"
4. Selecione "Rebuild" (sem cache)

## Checklist de Verificação

- [ ] Root Directory configurado como `app`
- [ ] Build Command é `npm run build`
- [ ] Output Directory é `dist`
- [ ] Build funciona localmente
- [ ] Arquivo `vercel.json` existe em `app/`
- [ ] Arquivo `.babelrc` existe em `app/`
- [ ] Todas as dependências estão no `package.json`
- [ ] Node version é 20.x

## Verificar Dependências

Certifique-se que estas dependências estão no `package.json`:

```json
{
  "devDependencies": {
    "@babel/core": "^7.24.0",
    "@babel/preset-env": "^7.24.0",
    "@babel/preset-react": "^7.26.3",
    "@babel/preset-typescript": "^7.24.0",
    "babel-loader": "^9.1.3",
    "css-loader": "^7.1.2",
    "html-webpack-plugin": "^5.6.3",
    "style-loader": "^4.0.0",
    "webpack": "^5.97.1",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^5.1.0",
    "webpack-merge": "^6.0.1"
  }
}
```

## Comandos Úteis

```bash
# Limpar tudo e reinstalar
cd app
rm -rf node_modules package-lock.json dist
npm install
npm run build

# Verificar se os arquivos foram gerados
ls -la dist/

# Commit e push
git add .
git commit -m "Fix Vercel deployment"
git push origin main
```

## Ainda não funciona?

Se após todas essas etapas ainda não funcionar:

1. Verifique os logs de build na Vercel
2. Copie os erros
3. Procure por erros específicos no Google
4. Verifique se os microfrontends (dashboard e home) estão acessíveis

## URLs dos Microfrontends

Certifique-se que estes URLs estão acessíveis:
- Dashboard: https://mfe-dashboard-cyan.vercel.app/
- Home: https://mfe-home-lovat.vercel.app/

Se eles retornarem 404, o problema está nos microfrontends, não no app principal.

