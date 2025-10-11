# Guia Completo de Configuração na Vercel

## 🚨 Erro 404: NOT_FOUND - Solução Definitiva

Se você está vendo o erro `404: NOT_FOUND` na Vercel, siga este guia passo a passo.

## 📋 Pré-requisitos

1. Conta na Vercel
2. Repositório Git conectado
3. Projeto commitado com todas as alterações

## 🔧 Configuração Passo a Passo

### Opção 1: Deploy APENAS a pasta `app` (Recomendado)

Esta é a maneira mais simples se você quer deployar apenas o app principal.

#### 1. Na Vercel, vá em Settings

Acesse: `https://vercel.com/[seu-usuario]/striker-micro-frontend/settings/general`

#### 2. Configure o Root Directory

- Encontre a seção **"Root Directory"**
- Clique em **"Edit"**
- Digite: `app`
- Clique em **"Save"**

![Root Directory](https://i.imgur.com/example.png)

#### 3. Configure Build & Development Settings

- **Framework Preset**: `Other`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### 4. Configure Node.js Version

- Na seção **"Node.js Version"**, selecione: `20.x`

#### 5. Force um Redeploy

- Vá em **"Deployments"**
- Clique no último deployment
- Clique em **"..."** (três pontos)
- Selecione **"Redeploy"**
- Marque **"Use existing Build Cache"**
- Clique em **"Redeploy"**

### Opção 2: Deploy da raiz do projeto

Se você quer manter a estrutura de monorepo:

#### 1. Mover vercel.json para a raiz

Copie o arquivo `app/vercel.json` para a raiz do projeto e ajuste:

```json
{
  "buildCommand": "cd app && npm install && npm run build",
  "outputDirectory": "app/dist",
  "devCommand": "cd app && npm run start",
  "installCommand": "cd app && npm install",
  "cleanUrls": false,
  "trailingSlash": false,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### 2. Configure na Vercel

- **Root Directory**: deixe em branco (raiz)
- **Build Command**: `cd app && npm run build`
- **Output Directory**: `app/dist`
- **Install Command**: `cd app && npm install`

## ✅ Checklist de Verificação

Antes de fazer o deploy, verifique:

- [ ] O arquivo `app/vercel.json` existe
- [ ] O arquivo `app/.babelrc` existe
- [ ] O arquivo `app/package.json` tem todas as dependências
- [ ] O build funciona localmente (`cd app && npm run build`)
- [ ] A pasta `app/dist` é gerada com `index.html` e arquivos `.js`
- [ ] Root Directory está configurado como `app` na Vercel
- [ ] Node.js version está configurado como `20.x`

## 🧪 Testar Build Localmente

Antes de fazer deploy, teste se o build funciona:

```bash
cd app

# Limpar tudo
rm -rf node_modules dist package-lock.json

# Instalar dependências
npm install

# Build
npm run build

# Verificar se gerou os arquivos
ls -la dist/
```

Se o comando acima funcionar e gerar a pasta `dist` com `index.html`, então o problema está na configuração da Vercel.

## 🔍 Verificar Logs de Build na Vercel

1. Acesse seu projeto na Vercel
2. Vá em **"Deployments"**
3. Clique no último deployment (que deu 404)
4. Clique em **"Building"**
5. Leia os logs completos

Procure por:
- ❌ `Error: Cannot find module`
- ❌ `Module not found`
- ❌ `Failed to compile`
- ❌ Erros do webpack
- ❌ Erros do babel

## 🎯 Causas Comuns do Erro 404

### 1. Root Directory não configurado

**Solução**: Configure `Root Directory` como `app`

### 2. Output Directory incorreto

**Solução**: Configure `Output Directory` como `dist` (não `app/dist`)

### 3. Build falhou mas Vercel não mostrou erro

**Solução**: 
- Verifique os logs de build
- Teste o build localmente primeiro

### 4. Arquivo index.html não foi gerado

**Solução**:
- Verifique se o HtmlWebpackPlugin está configurado no webpack.common.js
- Verifique se o arquivo `public/index.html` existe

### 5. Dependências faltando

**Solução**:
- Adicione todas as dependências do babel no `package.json`:
  ```json
  {
    "devDependencies": {
      "@babel/core": "^7.24.0",
      "@babel/preset-env": "^7.24.0",
      "@babel/preset-react": "^7.26.3",
      "@babel/preset-typescript": "^7.24.0",
      "babel-loader": "^9.1.3",
      "webpack-merge": "^6.0.1"
    }
  }
  ```

## 📸 Screenshots das Configurações Corretas

### General Settings
```
Root Directory: app
```

### Build & Development Settings
```
Framework Preset: Other
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node.js Version: 20.x
```

## 🔄 Forçar Redeploy Limpo

Se nada funcionar, force um redeploy limpo:

1. Vá em **"Deployments"**
2. Clique no último deployment
3. Clique em **"..."** (três pontos)
4. Selecione **"Redeploy"**
5. **NÃO marque** "Use existing Build Cache"
6. Clique em **"Redeploy"**

Isso vai forçar um build completamente novo sem usar cache.

## 🆘 Solução de Última Instância

Se NADA funcionar:

1. **Delete o projeto da Vercel completamente**
2. **Crie um novo projeto**
3. **Configure do zero seguindo este guia**

### Passos para criar novo projeto:

1. Na Vercel, clique em **"Add New..."** → **"Project"**
2. Selecione seu repositório
3. **ANTES de clicar em "Deploy"**, configure:
   - Root Directory: `app`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. Clique em **"Deploy"**

## 📞 Ainda com problemas?

Se após TODOS esses passos ainda não funcionar:

1. Copie os logs de build completos da Vercel
2. Verifique se há erros específicos
3. Procure o erro específico no Google
4. Verifique se a versão do Node.js está correta (20.x)
5. Certifique-se que o repositório Git está atualizado

## 🎉 Sucesso!

Quando funcionar, você deve ver:
- ✅ Deploy com status "Ready"
- ✅ URL acessível sem erro 404
- ✅ Página carregando corretamente

## 🔗 URLs de Referência

- Documentação Vercel: https://vercel.com/docs
- Webpack Module Federation: https://webpack.js.org/concepts/module-federation/
- Troubleshooting Vercel: https://vercel.com/docs/concepts/deployments/troubleshoot-a-build

