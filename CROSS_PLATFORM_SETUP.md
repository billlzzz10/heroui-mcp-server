# 🌍 Cross-Platform MCP Server Setup

รองรับ macOS, Linux, Windows, WSL และ AI clients/IDEs หลากหลาย

## 🖥️ Platform-Specific Setup

### 🍎 macOS
```bash
# Install Node.js
brew install node

# Clone and setup
git clone https://github.com/billlzzz10/heroui-mcp-server.git
cd heroui-mcp-server
npm install --legacy-peer-deps
npm run build

# Run server
node dist/server/index.js
```

### 🐧 Linux (Ubuntu/Debian)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone https://github.com/billlzzz10/heroui-mcp-server.git
cd heroui-mcp-server
npm install --legacy-peer-deps
npm run build

# Run server
node dist/server/index.js
```

### 🪟 Windows (PowerShell)
```powershell
# Install Node.js (download from nodejs.org)
# Or use Chocolatey
choco install nodejs

# Clone and setup
git clone https://github.com/billlzzz10/heroui-mcp-server.git
cd heroui-mcp-server
npm install --legacy-peer-deps
npm run build

# Run server
node dist/server/index.js
```

### 🔧 WSL (Windows Subsystem for Linux)
```bash
# Same as Linux setup
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

git clone https://github.com/billlzzz10/heroui-mcp-server.git
cd heroui-mcp-server
npm install --legacy-peer-deps
npm run build

# Run server
node dist/server/index.js
```

## 🤖 AI Client Configurations

### 💬 ChatGPT (OpenAI)
```json
// ~/.config/openai/mcp_config.json
{
  "mcpServers": {
    "heroui": {
      "command": "node",
      "args": ["/absolute/path/to/heroui-mcp-server/dist/server/index.js"],
      "cwd": "/absolute/path/to/heroui-mcp-server"
    }
  }
}
```

### 🔶 AWS Q
```json
// ~/.aws/q_config.json
{
  "mcpServers": {
    "heroui": {
      "command": "node",
      "args": ["/absolute/path/to/heroui-mcp-server/dist/server/index.js"],
      "cwd": "/absolute/path/to/heroui-mcp-server",
      "env": {
        "AWS_REGION": "us-east-1"
      }
    }
  }
}
```

### 🎯 Cursor IDE
```json
// ~/.cursor/mcp_servers.json
{
  "heroui": {
    "command": "node",
    "args": ["/absolute/path/to/heroui-mcp-server/dist/server/index.js"],
    "cwd": "/absolute/path/to/heroui-mcp-server"
  }
}
```

### ⚡ Kilo
```json
// ~/.kilo/config.json
{
  "mcp": {
    "servers": {
      "heroui": {
        "command": "node",
        "args": ["/absolute/path/to/heroui-mcp-server/dist/server/index.js"],
        "cwd": "/absolute/path/to/heroui-mcp-server"
      }
    }
  }
}
```

### 📝 VS Code (with MCP extension)
```json
// .vscode/settings.json
{
  "mcp.servers": {
    "heroui": {
      "command": "node",
      "args": ["/absolute/path/to/heroui-mcp-server/dist/server/index.js"],
      "cwd": "/absolute/path/to/heroui-mcp-server"
    }
  }
}
```

### 🌳 Tree.ai
```json
// ~/.tree/mcp_config.json
{
  "servers": {
    "heroui": {
      "command": "node",
      "args": ["/absolute/path/to/heroui-mcp-server/dist/server/index.js"],
      "cwd": "/absolute/path/to/heroui-mcp-server"
    }
  }
}
```

### 🧠 Claude Desktop
```json
// ~/.config/claude/claude_desktop_config.json (Linux/macOS)
// %APPDATA%/Claude/claude_desktop_config.json (Windows)
{
  "mcpServers": {
    "heroui": {
      "command": "node",
      "args": ["/absolute/path/to/heroui-mcp-server/dist/server/index.js"],
      "cwd": "/absolute/path/to/heroui-mcp-server"
    }
  }
}
```

## 🎨 IDE Card Display Support

### VS Code Extension Manifest
```json
{
  "name": "heroui-mcp",
  "displayName": "HeroUI MCP Components",
  "description": "UI Component generator with MCP",
  "version": "1.0.0",
  "contributes": {
    "commands": [
      {
        "command": "heroui.createButton",
        "title": "Create Button",
        "category": "HeroUI"
      }
    ],
    "webviews": [
      {
        "viewType": "heroui.preview",
        "title": "Component Preview"
      }
    ]
  }
}
```

### Cursor Integration
```typescript
// cursor-extension.ts
export class HeroUIProvider {
  provideCompletionItems() {
    return [
      {
        label: 'heroui-button',
        insertText: 'create_button text="${1:Button Text}" variant="${2:primary}"',
        documentation: 'Create HeroUI button component'
      }
    ];
  }
}
```

## 🔧 Universal Installation Script

### install.sh (Linux/macOS/WSL)
```bash
#!/bin/bash
set -e

echo "🚀 Installing HeroUI MCP Server..."

# Detect OS
OS="$(uname -s)"
case "${OS}" in
    Linux*)     MACHINE=Linux;;
    Darwin*)    MACHINE=Mac;;
    CYGWIN*)    MACHINE=Cygwin;;
    MINGW*)     MACHINE=MinGw;;
    *)          MACHINE="UNKNOWN:${OS}"
esac

echo "Detected OS: $MACHINE"

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    if [[ "$MACHINE" == "Mac" ]]; then
        brew install node
    elif [[ "$MACHINE" == "Linux" ]]; then
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
fi

# Clone and setup
git clone https://github.com/billlzzz10/heroui-mcp-server.git
cd heroui-mcp-server
npm install --legacy-peer-deps
npm run build

echo "✅ Installation complete!"
echo "Run: node dist/server/index.js"
```

### install.ps1 (Windows PowerShell)
```powershell
Write-Host "🚀 Installing HeroUI MCP Server..." -ForegroundColor Green

# Check if Node.js is installed
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Node.js..." -ForegroundColor Yellow
    if (Get-Command choco -ErrorAction SilentlyContinue) {
        choco install nodejs -y
    } else {
        Write-Host "Please install Node.js from https://nodejs.org" -ForegroundColor Red
        exit 1
    }
}

# Clone and setup
git clone https://github.com/billlzzz10/heroui-mcp-server.git
Set-Location heroui-mcp-server
npm install --legacy-peer-deps
npm run build

Write-Host "✅ Installation complete!" -ForegroundColor Green
Write-Host "Run: node dist/server/index.js" -ForegroundColor Cyan
```

## 🌐 HTTP Server Mode (for web-based IDEs)

### HTTP Wrapper
```javascript
// http-server.js
const express = require('express');
const { spawn } = require('child_process');
const app = express();

app.use(express.json());

app.post('/mcp', (req, res) => {
  const mcpProcess = spawn('node', ['dist/server/index.js']);
  
  mcpProcess.stdin.write(JSON.stringify(req.body));
  mcpProcess.stdin.end();
  
  let output = '';
  mcpProcess.stdout.on('data', (data) => {
    output += data.toString();
  });
  
  mcpProcess.on('close', () => {
    try {
      const result = JSON.parse(output.split('\n')[1]);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

app.listen(3000, () => {
  console.log('🌐 HeroUI MCP HTTP Server running on port 3000');
});
```

## 📱 Mobile/Web Integration

### Web Component
```html
<!DOCTYPE html>
<html>
<head>
    <title>HeroUI MCP Web Client</title>
</head>
<body>
    <div id="heroui-app">
        <input id="prompt" placeholder="Describe your component...">
        <button onclick="generateComponent()">Generate</button>
        <div id="result"></div>
    </div>
    
    <script>
        async function generateComponent() {
            const prompt = document.getElementById('prompt').value;
            const response = await fetch('/mcp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'tools/call',
                    params: {
                        name: 'generate_component',
                        arguments: { description: prompt }
                    }
                })
            });
            
            const result = await response.json();
            document.getElementById('result').innerHTML = result.result.content[0].text;
        }
    </script>
</body>
</html>
```

## 🔍 Path Detection Utility

### auto-detect-paths.js
```javascript
const os = require('os');
const path = require('path');
const fs = require('fs');

function detectPaths() {
    const platform = os.platform();
    const home = os.homedir();
    
    const configs = {
        claude: {
            darwin: path.join(home, '.config/claude/claude_desktop_config.json'),
            linux: path.join(home, '.config/claude/claude_desktop_config.json'),
            win32: path.join(home, 'AppData/Roaming/Claude/claude_desktop_config.json')
        },
        cursor: {
            darwin: path.join(home, '.cursor/mcp_servers.json'),
            linux: path.join(home, '.cursor/mcp_servers.json'),
            win32: path.join(home, 'AppData/Roaming/Cursor/mcp_servers.json')
        },
        vscode: {
            darwin: path.join(home, '.vscode/settings.json'),
            linux: path.join(home, '.vscode/settings.json'),
            win32: path.join(home, 'AppData/Roaming/Code/User/settings.json')
        }
    };
    
    return Object.fromEntries(
        Object.entries(configs).map(([client, paths]) => [
            client,
            paths[platform] || paths.linux
        ])
    );
}

module.exports = { detectPaths };
```

---

## 🚀 Quick Start Commands

### One-liner Installation
```bash
# Linux/macOS/WSL
curl -fsSL https://raw.githubusercontent.com/billlzzz10/heroui-mcp-server/main/install.sh | bash

# Windows PowerShell
iwr -useb https://raw.githubusercontent.com/billlzzz10/heroui-mcp-server/main/install.ps1 | iex
```

### Universal Run Command
```bash
# Works on all platforms
npx heroui-mcp-server
```

**🌍 ตอนนี้รองรับทุก platform และ AI client แล้ว!** 🚀
