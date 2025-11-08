# 🔧 Session Configuration

การตั้งค่า session สำหรับ HeroUI MCP Server

## 📋 Basic Configuration

### Environment Variables
```bash
# Core Settings
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Session Management
SESSION_TTL=3600                    # Session timeout (seconds)
MAX_SESSIONS=100                    # Maximum concurrent sessions
SESSION_CLEANUP_INTERVAL=300       # Cleanup interval (seconds)

# Memory Management
MAX_MEMORY_USAGE=512               # Max memory per session (MB)
MEMORY_CHECK_INTERVAL=30000        # Memory check interval (ms)

# AI Services (Optional)
OPENAI_API_KEY=your_openai_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here
ENABLE_AI_GENERATION=true

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/heroui.log
```

## 🎯 Client-Specific Configurations

### Claude Desktop
```json
{
  "mcpServers": {
    "heroui": {
      "command": "node",
      "args": ["/absolute/path/to/heroui-mcp-server/dist/server/index.js"],
      "cwd": "/absolute/path/to/heroui-mcp-server",
      "env": {
        "NODE_ENV": "production",
        "LOG_LEVEL": "info",
        "SESSION_TTL": "7200"
      }
    }
  }
}
```

### AWS Q
```json
{
  "mcpServers": {
    "heroui": {
      "command": "node",
      "args": ["/absolute/path/to/heroui-mcp-server/dist/server/index.js"],
      "cwd": "/absolute/path/to/heroui-mcp-server",
      "env": {
        "AWS_REGION": "us-east-1",
        "NODE_ENV": "production",
        "ENABLE_AI_GENERATION": "false"
      }
    }
  }
}
```

### Cursor IDE
```json
{
  "heroui": {
    "command": "node",
    "args": ["/absolute/path/to/heroui-mcp-server/dist/server/index.js"],
    "cwd": "/absolute/path/to/heroui-mcp-server",
    "env": {
      "NODE_ENV": "development",
      "LOG_LEVEL": "debug"
    }
  }
}
```

### VS Code
```json
{
  "mcp.servers": {
    "heroui": {
      "command": "node",
      "args": ["/absolute/path/to/heroui-mcp-server/dist/server/index.js"],
      "cwd": "/absolute/path/to/heroui-mcp-server",
      "env": {
        "NODE_ENV": "development",
        "ENABLE_WEBSOCKETS": "true"
      }
    }
  }
}
```

## 🔐 Security Configuration

### API Keys Management
```bash
# Create .env file
cp .env.example .env

# Edit with your keys
OPENAI_API_KEY=sk-your-openai-key-here
ANTHROPIC_API_KEY=your-anthropic-key-here

# Security settings
API_KEY=your-api-key-for-http-access
JWT_SECRET=your-jwt-secret-here
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=60000
```

### Secure Headers
```javascript
// In http-server.js
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
```

## 📊 Performance Configuration

### Memory Optimization
```bash
# Node.js memory settings
NODE_OPTIONS="--max-old-space-size=2048"
UV_THREADPOOL_SIZE=4

# Session optimization
MAX_COMPONENTS_PER_SESSION=50
COMPONENT_CACHE_TTL=1800
TEMPLATE_CACHE_TTL=3600
```

### Concurrent Sessions
```javascript
// Session limits
const sessionConfig = {
  maxSessions: process.env.MAX_SESSIONS || 100,
  sessionTTL: process.env.SESSION_TTL || 3600,
  cleanupInterval: process.env.SESSION_CLEANUP_INTERVAL || 300,
  memoryLimit: process.env.MAX_MEMORY_USAGE || 512
};
```

## 🌐 Network Configuration

### HTTP Server Mode
```bash
# Start HTTP server
node src/http-server.js

# Or with PM2
pm2 start src/http-server.js --name heroui-http
```

### Reverse Proxy (Nginx)
```nginx
server {
    listen 80;
    server_name heroui.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔄 Auto-Configuration Script

### config-generator.js
```javascript
const fs = require('fs');
const path = require('path');
const os = require('os');

function generateConfig(clientType, serverPath) {
    const configs = {
        claude: {
            path: path.join(os.homedir(), '.config/claude/claude_desktop_config.json'),
            content: {
                mcpServers: {
                    heroui: {
                        command: 'node',
                        args: [path.join(serverPath, 'dist/server/index.js')],
                        cwd: serverPath,
                        env: {
                            NODE_ENV: 'production',
                            LOG_LEVEL: 'info'
                        }
                    }
                }
            }
        },
        cursor: {
            path: path.join(os.homedir(), '.cursor/mcp_servers.json'),
            content: {
                heroui: {
                    command: 'node',
                    args: [path.join(serverPath, 'dist/server/index.js')],
                    cwd: serverPath
                }
            }
        },
        vscode: {
            path: path.join(os.homedir(), '.vscode/settings.json'),
            content: {
                "mcp.servers": {
                    heroui: {
                        command: 'node',
                        args: [path.join(serverPath, 'dist/server/index.js')],
                        cwd: serverPath
                    }
                }
            }
        }
    };

    const config = configs[clientType];
    if (!config) {
        throw new Error(`Unsupported client type: ${clientType}`);
    }

    // Create directory if not exists
    const configDir = path.dirname(config.path);
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
    }

    // Write config
    fs.writeFileSync(config.path, JSON.stringify(config.content, null, 2));
    console.log(`✅ ${clientType} configuration created at ${config.path}`);
}

// Usage: node config-generator.js claude /path/to/heroui-mcp-server
if (require.main === module) {
    const [,, clientType, serverPath] = process.argv;
    if (!clientType || !serverPath) {
        console.log('Usage: node config-generator.js <client> <server-path>');
        console.log('Clients: claude, cursor, vscode');
        process.exit(1);
    }
    generateConfig(clientType, serverPath);
}

module.exports = { generateConfig };
```

## 🐳 Docker Configuration

### docker-compose.yml
```yaml
version: '3.8'
services:
  heroui-mcp:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - SESSION_TTL=3600
      - MAX_SESSIONS=100
      - LOG_LEVEL=info
    volumes:
      - ./data:/app/data
      - ./logs:/app/logs
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## 📱 Mobile/Web Configuration

### Progressive Web App
```json
{
  "name": "HeroUI MCP",
  "short_name": "HeroUI",
  "description": "UI Component Generator",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#007bff",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

## 🔍 Monitoring Configuration

### Health Checks
```javascript
// Health check endpoint
app.get('/health', (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    sessions: sessionManager.getActiveSessionCount(),
    tools: toolRegistry.getToolCount()
  };
  res.json(health);
});
```

### Logging Configuration
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});
```

---

## 🚀 Quick Setup Commands

### Auto-configure for Claude Desktop
```bash
node config-generator.js claude $(pwd)
```

### Start with custom config
```bash
NODE_ENV=production SESSION_TTL=7200 node dist/server/index.js
```

### HTTP server with monitoring
```bash
npm run http-server
```

**🔧 Session configuration พร้อมใช้งานแล้ว!** 🚀
