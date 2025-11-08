# Configuration

## Environment Variables

```bash
# Server
PORT=3000
HOST=localhost
NODE_ENV=production

# Database
DB_TYPE=sqlite
DB_PATH=./data/heroui.db

# Cache
REDIS_URL=redis://localhost:6379
```

## Config File

```json
{
  "server": {
    "port": 3000,
    "host": "localhost"
  },
  "database": {
    "type": "sqlite",
    "path": "./data/heroui.db"
  }
}
```
