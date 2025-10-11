# Migração de AWS para Vercel

Este projeto foi migrado de AWS (S3 + CloudFront) para Vercel.

## O que foi removido

### ❌ Arquivos AWS Removidos

1. **`.github/workflows/deploy-app.yml`** - CI/CD para deploy do app na AWS
2. **`.github/workflows/deploy-carrinho.yml`** - CI/CD para deploy do carrinho na AWS
3. **`.github/workflows/deploy-produtos.yml`** - CI/CD para deploy do produtos na AWS
4. **`terraform/`** - Configurações de infraestrutura AWS (Terraform)

### ✅ Makefile Atualizado

O `Makefile` foi simplificado removendo:
- `aws-configure` - Configuração de credenciais AWS
- `terraform-init` - Inicialização do Terraform
- `terraform-plan` - Planejamento de infraestrutura
- `terraform-apply` - Aplicação de infraestrutura
- `terraform-destroy` - Destruição de infraestrutura
- `build-all` - Build para AWS
- `deploy-local` - Deploy para AWS S3/CloudFront

### 📦 Comandos Disponíveis Agora

```bash
# Instalação e configuração
make setup          # Configura o ambiente
make install        # Instala dependências
make clean          # Limpa node_modules

# Docker (desenvolvimento local)
make docker-build   # Constrói imagens Docker
make docker-up      # Inicia serviços Docker
make docker-down    # Para serviços Docker
make docker-logs    # Mostra logs
make docker-clean   # Limpa Docker
```

## Nova Arquitetura de Deploy

### Desenvolvimento (Docker)
- **App**: http://localhost:8083
- **Carrinho**: http://localhost:8081
- **Dashboard**: http://localhost:8085
- **Home**: http://localhost:8086

### Produção (Vercel)
- **App**: [Seu domínio Vercel]
- **Dashboard**: https://mfe-dashboard-cyan.vercel.app/
- **Home**: https://mfe-home-lovat.vercel.app/

## Como Fazer Deploy Agora

### Para o App Principal
1. Configure o projeto na Vercel
2. O deploy é automático via Git push
3. Veja `app/VERCEL_DEPLOY.md` para detalhes

### Para os Microfrontends
Os microfrontends (dashboard e home) já estão deployados na Vercel:
- Dashboard: https://mfe-dashboard-cyan.vercel.app/
- Home: https://mfe-home-lovat.vercel.app/

## Configuração de Remotes

Os endpoints dos microfrontends são configurados automaticamente em:
- **Desenvolvimento**: URLs locais do Docker (localhost)
- **Produção**: URLs da Vercel

Veja `app/config/remotes.js` para detalhes.

## Benefícios da Migração

✅ **Mais simples**: Sem necessidade de gerenciar AWS
✅ **Deploy automático**: Push para Git = Deploy automático
✅ **Zero configuração**: Vercel detecta e configura automaticamente
✅ **CDN global**: Vercel tem CDN integrado
✅ **SSL grátis**: HTTPS automático
✅ **Preview deploys**: Cada PR tem seu próprio deploy

## Notas

- Os arquivos Docker e docker-compose.yml foram mantidos para desenvolvimento local
- O Makefile foi mantido mas simplificado
- As configurações de webpack foram atualizadas para Vercel

