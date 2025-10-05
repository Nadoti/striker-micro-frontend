# Docker Setup - Microfrontend Application

Este documento explica como usar Docker para executar a aplicação de microfrontends.

## Estrutura dos Projetos

- **app**: Aplicação principal (porta 8083) - consome os microfrontends
- **produtos**: Microfrontend de produtos (porta 8082) - expõe `./App`
- **carrinho**: Microfrontend de carrinho (porta 8081) - expõe `./App`

## Pré-requisitos

- Docker instalado
- Docker Compose instalado
- Make (opcional, para usar comandos simplificados)

## Comandos Disponíveis

### Usando Make (Recomendado)

```bash
# Construir e iniciar todos os serviços
make docker-up

# Parar todos os serviços
make docker-down

# Ver logs em tempo real
make docker-logs

# Limpar containers, imagens e volumes
make docker-clean

# Apenas construir as imagens
make docker-build
```

### Usando Docker Compose Diretamente

```bash
# Construir e iniciar todos os serviços
docker-compose up -d

# Parar todos os serviços
docker-compose down

# Ver logs
docker-compose logs -f

# Construir apenas as imagens
docker-compose build
```

## URLs de Acesso

Após iniciar os serviços, você pode acessar:

- **Aplicação Principal**: http://localhost:8083
- **Microfrontend Carrinho**: http://localhost:8081
- **Microfrontend Produtos**: http://localhost:8082

## Arquitetura Docker

### Serviços

1. **carrinho**: Microfrontend de carrinho
   - Porta: 8081
   - Health check: verifica se o serviço está respondendo

2. **produtos**: Microfrontend de produtos
   - Porta: 8082
   - Health check: verifica se o serviço está respondendo

3. **app**: Aplicação principal
   - Porta: 8083
   - Depende dos outros dois serviços
   - Só inicia após os microfrontends estarem saudáveis

### Rede

Todos os serviços estão conectados à rede `mfe-network` para comunicação interna.

### Volumes

- Código fonte é montado para desenvolvimento
- `node_modules` são volumes nomeados para melhor performance

## Desenvolvimento

### Hot Reload

Os volumes montados permitem hot reload durante o desenvolvimento. Mudanças no código são refletidas automaticamente nos containers.

### Logs

Para acompanhar o desenvolvimento:

```bash
# Logs de todos os serviços
make docker-logs

# Logs de um serviço específico
docker-compose logs -f app
docker-compose logs -f carrinho
docker-compose logs -f produtos
```

### Debugging

Para acessar um container específico:

```bash
# Acessar o container da aplicação principal
docker-compose exec app sh

# Acessar o container do carrinho
docker-compose exec carrinho sh

# Acessar o container de produtos
docker-compose exec produtos sh
```

## Troubleshooting

### Problemas Comuns

1. **Porta já em uso**: Verifique se as portas 8081, 8082 e 8083 estão livres
2. **Serviços não iniciam**: Verifique os logs com `make docker-logs`
3. **Problemas de rede**: Execute `docker network prune` para limpar redes antigas

### Limpeza Completa

```bash
# Parar e remover tudo
make docker-clean

# Ou manualmente
docker-compose down -v --rmi all
docker system prune -f
```

## Produção

Para ambiente de produção, considere:

1. Usar imagens otimizadas (multi-stage builds)
2. Configurar variáveis de ambiente apropriadas
3. Usar um orquestrador como Kubernetes
4. Configurar health checks mais robustos
5. Implementar logging centralizado

## Estrutura de Arquivos Docker

```
├── docker-compose.yml          # Configuração dos serviços
├── app/
│   ├── Dockerfile             # Imagem da aplicação principal
│   └── .dockerignore          # Arquivos ignorados no build
├── produtos/
│   ├── Dockerfile             # Imagem do microfrontend produtos
│   └── .dockerignore          # Arquivos ignorados no build
└── carrinho/
    ├── Dockerfile             # Imagem do microfrontend carrinho
    └── .dockerignore          # Arquivos ignorados no build
```
