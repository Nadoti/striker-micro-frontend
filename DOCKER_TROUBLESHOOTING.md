# Troubleshooting - Erro de Module Federation no Docker

## Erro: Loading script failed (error: http://localhost:8086/remoteEntry.js)

Este erro significa que o microfrontend não está acessível. Veja como resolver:

### ✅ Solução Rápida

1. **Verifique se todos os serviços estão rodando:**
   ```bash
   docker-compose ps
   ```

   Você deve ver todos os serviços com status `healthy`:
   ```
   NAME                    STATUS
   striker-mfe-app-1       Up (healthy)
   striker-mfe-carrinho-1  Up (healthy)
   striker-mfe-dashboard-1 Up (healthy)
   striker-mfe-home-1      Up (healthy)
   ```

2. **Se algum serviço não estiver rodando, inicie-os:**
   ```bash
   docker-compose up -d
   ```

3. **Se algum serviço estiver `unhealthy`, reinicie-os:**
   ```bash
   docker-compose restart home
   # ou restart todos
   docker-compose restart
   ```

### 🔍 Verificações Detalhadas

#### 1. Verificar se o remoteEntry.js está acessível

Abra o navegador e tente acessar:
- http://localhost:8086/remoteEntry.js (Home)
- http://localhost:8085/remoteEntry.js (Dashboard)
- http://localhost:8081/remoteEntry.js (Carrinho)

Se retornar 404 ou não carregar, o serviço não está funcionando.

#### 2. Verificar logs do serviço

```bash
# Ver logs do home
docker-compose logs home

# Ver logs de todos os serviços
docker-compose logs

# Ver logs em tempo real
docker-compose logs -f home
```

Procure por erros como:
- `Module not found`
- `Cannot find module`
- Erros de compilação do webpack
- Erros de porta já em uso

#### 3. Verificar se as portas estão corretas

Verifique se as portas não estão sendo usadas por outros processos:

**Windows:**
```bash
netstat -ano | findstr :8086
netstat -ano | findstr :8085
netstat -ano | findstr :8081
netstat -ano | findstr :8083
```

Se alguma porta estiver em uso por outro processo, você tem duas opções:
- Parar o outro processo
- Mudar a porta no docker-compose.yml

#### 4. Reconstruir os containers

Às vezes é necessário reconstruir os containers:

```bash
# Parar todos os serviços
docker-compose down

# Reconstruir sem cache
docker-compose build --no-cache

# Iniciar novamente
docker-compose up -d

# Ver logs
docker-compose logs -f
```

#### 5. Verificar health checks

Se um serviço está `unhealthy`, o problema pode estar no health check:

```bash
# Ver status detalhado
docker-compose ps

# Verificar se o curl está funcionando dentro do container
docker-compose exec home curl -f http://localhost:8086
```

### 🛠️ Comandos Úteis

```bash
# Parar todos os serviços
docker-compose down

# Parar e remover volumes
docker-compose down -v

# Reconstruir sem cache
docker-compose build --no-cache

# Iniciar em modo detached (background)
docker-compose up -d

# Iniciar e ver logs (foreground)
docker-compose up

# Ver logs de um serviço específico
docker-compose logs home

# Ver logs em tempo real
docker-compose logs -f

# Verificar status dos serviços
docker-compose ps

# Entrar em um container
docker-compose exec home sh

# Reiniciar um serviço específico
docker-compose restart home

# Reiniciar todos os serviços
docker-compose restart
```

### 🚨 Problemas Comuns

#### Problema 1: Porta já em uso

**Erro:** `port is already allocated`

**Solução:**
1. Encontre o processo usando a porta:
   ```bash
   # Windows
   netstat -ano | findstr :8086
   
   # Linux/Mac
   lsof -i :8086
   ```

2. Pare o processo ou mude a porta no docker-compose.yml

#### Problema 2: Serviço unhealthy

**Erro:** Container está rodando mas marcado como `unhealthy`

**Solução:**
1. Verificar logs: `docker-compose logs home`
2. Verificar se o webpack está compilando: Procure por "Compiled successfully" nos logs
3. Aumentar o `start_period` no health check do docker-compose.yml

#### Problema 3: Module not found

**Erro:** `Module not found` nos logs

**Solução:**
1. Verificar se todas as dependências estão instaladas:
   ```bash
   docker-compose exec home npm install
   ```

2. Se necessário, reconstruir:
   ```bash
   docker-compose down
   docker-compose build --no-cache home
   docker-compose up -d
   ```

#### Problema 4: CORS Error

**Erro:** `Access-Control-Allow-Origin` error no navegador

**Solução:**
Verificar se os headers CORS estão configurados no webpack.dev.js:
```js
headers: {
  'Access-Control-Allow-Origin': '*',
}
```

### 📋 Checklist de Verificação

Antes de reportar um problema, verifique:

- [ ] Todos os serviços estão rodando (`docker-compose ps`)
- [ ] Todos os serviços estão `healthy`
- [ ] As portas não estão sendo usadas por outros processos
- [ ] O remoteEntry.js está acessível (http://localhost:8086/remoteEntry.js)
- [ ] Não há erros nos logs (`docker-compose logs`)
- [ ] O webpack compilou com sucesso (procure "Compiled successfully" nos logs)
- [ ] Os volumes estão montados corretamente

### 🔄 Solução Definitiva (Reset Completo)

Se nada funcionar, faça um reset completo:

```bash
# Parar tudo e limpar
docker-compose down -v
docker system prune -f

# Remover node_modules local
rm -rf home/node_modules
rm -rf dashboard/node_modules
rm -rf app/node_modules

# Reconstruir tudo
docker-compose build --no-cache

# Iniciar
docker-compose up -d

# Ver logs
docker-compose logs -f
```

### 📞 Ainda com problemas?

Se após todos esses passos ainda não funcionar:

1. Copie os logs completos: `docker-compose logs > logs.txt`
2. Verifique os logs para erros específicos
3. Procure o erro específico no Google
4. Certifique-se que o Docker Desktop está atualizado

