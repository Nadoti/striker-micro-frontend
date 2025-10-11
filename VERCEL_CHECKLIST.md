# ✅ Checklist de Deploy na Vercel

Use este checklist para garantir que tudo está configurado corretamente.

## 🔧 Antes do Deploy

### Arquivos Locais
- [ ] Arquivo `app/vercel.json` existe
- [ ] Arquivo `app/.babelrc` existe
- [ ] Arquivo `app/.vercelignore` existe
- [ ] Arquivo `app/package.json` tem todas as dependências

### Testar Build Local
```bash
cd app
rm -rf node_modules dist
npm install
npm run build
```
- [ ] Build executou sem erros
- [ ] Pasta `app/dist/` foi criada
- [ ] Arquivo `app/dist/index.html` existe
- [ ] Arquivos `.js` foram gerados em `app/dist/`

### Git
- [ ] Todas as mudanças foram commitadas
- [ ] Push foi feito para o repositório
- [ ] Branch está atualizada

## ⚙️ Configuração na Vercel

### Settings → General
- [ ] **Root Directory**: `app` ← **MUITO IMPORTANTE!**

### Settings → Build & Development
- [ ] **Framework Preset**: `Other`
- [ ] **Build Command**: `npm run build`
- [ ] **Output Directory**: `dist`
- [ ] **Install Command**: `npm install`

### Settings → Node.js
- [ ] **Node.js Version**: `20.x`

### Settings → Environment Variables
- [ ] Nenhuma variável necessária (pode deixar vazio)

## 🚀 Deploy

### Fazer Deploy
- [ ] Vá em "Deployments"
- [ ] Clique em "Redeploy" (se já existe)
- [ ] Ou clique em "Deploy" (se é novo)

### Verificar Build
- [ ] Status do deployment é "Building"
- [ ] Aguarde até status "Ready"
- [ ] Não há erros nos logs de build

### Logs de Build (clique em "Building")
Procure por:
- [ ] ✅ "Installing dependencies..."
- [ ] ✅ "Building..."
- [ ] ✅ "Build completed successfully"
- [ ] ❌ Nenhum erro vermelho

## ✅ Verificação Pós-Deploy

### Testar URL
- [ ] Acesse a URL do projeto (ex: https://striker-micro-frontend.vercel.app/)
- [ ] Página carrega sem erro 404
- [ ] Não há tela branca
- [ ] Console do navegador não tem erros críticos

### Testar Rotas
- [ ] `/` (home) - carrega o App principal
- [ ] `/home` - carrega o microfrontend Home
- [ ] `/dashboard` - carrega o microfrontend Dashboard

### Verificar Microfrontends
- [ ] Dashboard está acessível: https://mfe-dashboard-cyan.vercel.app/
- [ ] Home está acessível: https://mfe-home-lovat.vercel.app/

## ❌ Se Der Erro 404

### Verificações Rápidas
1. [ ] Root Directory está configurado como `app`?
2. [ ] Output Directory está configurado como `dist`?
3. [ ] Build Command está configurado como `npm run build`?
4. [ ] Node.js Version está configurado como `20.x`?

### Forçar Redeploy Limpo
- [ ] Vá em "Deployments"
- [ ] Clique no deployment com erro
- [ ] Clique em "..." (três pontos)
- [ ] Clique em "Redeploy"
- [ ] **NÃO** marque "Use existing Build Cache"
- [ ] Clique em "Redeploy"

### Verificar Logs
- [ ] Clique no deployment
- [ ] Vá em "Building"
- [ ] Leia os logs completos
- [ ] Copie qualquer erro que aparecer

## 🆘 Última Opção

Se NADA funcionar:

1. [ ] Delete o projeto da Vercel
2. [ ] Crie um novo projeto do zero
3. [ ] Configure Root Directory ANTES de fazer deploy
4. [ ] Faça o deploy

## 📊 Status Esperado

Quando tudo estiver funcionando:

```
✅ Deployment Status: Ready
✅ Build Time: ~2-3 minutos
✅ URL acessível: https://striker-micro-frontend.vercel.app/
✅ Status Code: 200
✅ Página carrega corretamente
```

## 📞 Suporte

Se após seguir TODOS os passos ainda não funcionar:

1. Copie os logs de build da Vercel
2. Verifique se há erros específicos
3. Pesquise o erro específico no Google
4. Verifique a documentação da Vercel

---

## 🎯 Configuração Resumida (Copie e Cole)

Para facilitar, aqui está um resumo da configuração:

```
Root Directory: app
Framework Preset: Other
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node.js Version: 20.x
```

Copie esses valores exatamente como estão e cole nas configurações da Vercel.

