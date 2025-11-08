# 🏠 Local MCP Server Deployment

เนื่องจาก Smithery มีปัญหา CLI error ให้ใช้ Local MCP Server แทน

## 🚀 วิธีรัน Local MCP Server

### 1. เตรียม Environment
```bash
cd /mnt/c/Users/HOME-PC/Downloads/heroui-mcp-server
cp .env.example .env
```

### 2. แก้ไข .env (ถ้าต้องการ AI features)
```bash
# AI Services (Optional)
OPENAI_API_KEY=your_openai_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here
ENABLE_AI_GENERATION=true

# Basic Settings
NODE_ENV=development
PORT=3000
LOG_LEVEL=info
```

### 3. รัน MCP Server
```bash
# Development mode
npm run dev

# หรือ Production mode
npm run build
npm start

# หรือรันตรงๆ
node dist/server/index.js
```

## 🔗 การเชื่อมต่อกับ Claude Desktop

### 1. แก้ไข claude_desktop_config.json
```json
{
  "mcpServers": {
    "heroui": {
      "command": "node",
      "args": ["/mnt/c/Users/HOME-PC/Downloads/heroui-mcp-server/dist/server/index.js"],
      "cwd": "/mnt/c/Users/HOME-PC/Downloads/heroui-mcp-server"
    }
  }
}
```

### 2. หรือใช้ npx
```json
{
  "mcpServers": {
    "heroui": {
      "command": "npx",
      "args": ["-y", "tsx", "src/server/index.ts"],
      "cwd": "/mnt/c/Users/HOME-PC/Downloads/heroui-mcp-server"
    }
  }
}
```

## 🧪 ทดสอบการทำงาน

### 1. ทดสอบ MCP Server
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | node dist/server/index.js
```

### 2. ทดสอบ Tools
```bash
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"create_button","arguments":{"text":"Test","variant":"primary"}}}' | node dist/server/index.js
```

## 🎯 Tools ที่พร้อมใช้งาน

### Basic Components
- `create_button` - สร้าง button
- `create_input` - สร้าง input field  
- `create_grid` - สร้าง grid layout

### Advanced Features
- `get_conversation_history` - ดูประวัติการใช้งาน
- `provide_feedback` - ให้ feedback
- `get_smart_suggestions` - รับคำแนะนำอัจฉริยะ

### AI-Powered (ต้องการ API keys)
- `generate_component` - สร้าง component ด้วย AI
- `generate_button` - สร้าง button ด้วย AI
- `generate_form` - สร้าง form ด้วย AI
- `generate_layout` - สร้าง layout ด้วย AI

### Utilities
- `parse_markdown` - แปลง Markdown เป็น outline

## 🌐 URL สำหรับ Remote Access

ถ้าต้องการให้คนอื่นเข้าถึงได้:

```bash
# รันด้วย ngrok
npx ngrok http 3000

# หรือใช้ cloudflared
npx cloudflared tunnel --url http://localhost:3000
```

## 🔧 Troubleshooting

### ปัญหา: Module not found
```bash
npm run build
```

### ปัญหา: Permission denied
```bash
chmod +x dist/server/index.js
```

### ปัญหา: Port already in use
```bash
# เปลี่ยน port ใน .env
PORT=3001
```

## 📊 Monitoring

### ดู Logs
```bash
tail -f logs/heroui.log
```

### ดู Memory Usage
```bash
ps aux | grep node
```

### ดู Active Connections
```bash
netstat -an | grep :3000
```

---

**Local MCP Server พร้อมใช้งานแล้ว! 🚀**
