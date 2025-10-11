NODE_VERSION = 20.11.1
NPM_VERSION = 9.8.1

.PHONY: help setup install start clean docker-build docker-up docker-down docker-logs docker-clean

help:
	@echo "=== React Microfrontend - Comandos Disponíveis ==="
	@echo "make setup         - Configura o ambiente com a versão correta do Node.js e NPM"
	@echo "make install       - Instala todas as dependências dos microfrontends"
	@echo "make start         - Inicia a aplicação completa (todos os microfrontends)"
	@echo "make clean         - Remove node_modules e outros arquivos temporários"
	@echo ""
	@echo "=== Docker - Comandos Disponíveis ==="
	@echo "make docker-build  - Constrói as imagens Docker de todos os serviços"
	@echo "make docker-up     - Inicia todos os serviços com Docker Compose"
	@echo "make docker-down   - Para todos os serviços Docker"
	@echo "make docker-logs   - Mostra os logs de todos os serviços"
	@echo "make docker-clean  - Remove containers, imagens e volumes Docker"

setup:
	@echo "Configurando ambiente de desenvolvimento..."
	@echo "Verificando Node.js..."
	@if command -v node > /dev/null; then \
		node_version=$$(node -v | cut -d 'v' -f2); \
		echo "Node.js $$node_version encontrado"; \
		if [ "$$node_version" != "$(NODE_VERSION)" ]; then \
			echo "AVISO: A versão atual do Node.js ($$node_version) é diferente da recomendada ($(NODE_VERSION))."; \
			echo "Para instalar a versão recomendada, execute manualmente:"; \
			echo "  nvm install $(NODE_VERSION) && nvm use $(NODE_VERSION)"; \
		fi; \
	else \
		echo "Node.js não encontrado. Por favor, instale o Node.js v$(NODE_VERSION)."; \
		exit 1; \
	fi
	@echo "Verificando versão do NPM..."
	@npm --version
	@echo "Ambiente configurado com sucesso!"

install: setup
	@echo "Instalando dependências..."
	@echo "Instalando dependências do projeto principal..."
	@npm install --no-fund --no-audit
	@cd app && echo "Instalando dependências do microfrontend App..." && npm install --no-fund --no-audit
	@cd carrinho && echo "Instalando dependências do microfrontend Carrinho..." && npm install --no-fund --no-audit
	@cd dashboard && echo "Instalando dependências do microfrontend Dashboard..." && npm install --no-fund --no-audit
	@cd home && echo "Instalando dependências do microfrontend Home..." && npm install --no-fund --no-audit
	@echo "Todas as dependências foram instaladas com sucesso!"

start: install
	@echo "Iniciando a aplicação React Microfrontend..."
	@echo "Isso iniciará todos os microfrontends simultaneamente."
	@echo "Aplicação principal: http://localhost:8083"
	@echo "Carrinho: http://localhost:8081"
	@echo "Dashboard: http://localhost:8085"
	@echo "Home: http://localhost:8086"
	@npm run start:all

clean:
	@echo "Limpando arquivos temporários..."
	@echo "Removendo node_modules do projeto principal..."
	@rm -rf node_modules
	@echo "Removendo node_modules do microfrontend App..."
	@rm -rf app/node_modules
	@echo "Removendo node_modules do microfrontend Carrinho..."
	@rm -rf carrinho/node_modules
	@echo "Removendo node_modules do microfrontend Dashboard..."
	@rm -rf dashboard/node_modules
	@echo "Removendo node_modules do microfrontend Home..."
	@rm -rf home/node_modules
	@echo "Limpeza concluída!"

# === Comandos Docker ===

docker-build:
	@echo "=== Construindo imagens Docker ==="
	@docker-compose build --no-cache
	@echo "Imagens Docker construídas com sucesso!"

docker-up: docker-build
	@echo "=== Iniciando serviços com Docker Compose ==="
	@echo "Aplicação principal: http://localhost:8083"
	@echo "Microfrontend Carrinho: http://localhost:8081"
	@echo "Microfrontend Dashboard: http://localhost:8085"
	@echo "Microfrontend Home: http://localhost:8086"
	@docker-compose up -d
	@echo "Serviços iniciados com sucesso!"

docker-down:
	@echo "=== Parando serviços Docker ==="
	@docker-compose down
	@echo "Serviços parados com sucesso!"

docker-logs:
	@echo "=== Logs dos serviços Docker ==="
	@docker-compose logs -f

docker-clean:
	@echo "=== Limpando containers, imagens e volumes Docker ==="
	@docker-compose down -v --rmi all
	@docker system prune -f
	@echo "Limpeza Docker concluída com sucesso!"

