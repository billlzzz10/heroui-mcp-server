Write-Host "🚀 Installing HeroUI MCP Server..." -ForegroundColor Green

# Check if Node.js is installed
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Node.js..." -ForegroundColor Yellow
    if (Get-Command choco -ErrorAction SilentlyContinue) {
        choco install nodejs -y
    } elseif (Get-Command winget -ErrorAction SilentlyContinue) {
        winget install OpenJS.NodeJS
    } else {
        Write-Host "❌ Please install Node.js from https://nodejs.org" -ForegroundColor Red
        Write-Host "Or install Chocolatey/Winget first" -ForegroundColor Yellow
        exit 1
    }
    
    # Refresh PATH
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
}

# Check Node.js version
$nodeVersion = (node --version).Substring(1).Split('.')[0]
if ([int]$nodeVersion -lt 18) {
    Write-Host "❌ Node.js version 18+ required. Current: $(node --version)" -ForegroundColor Red
    exit 1
}

# Clone repository if not exists
if (!(Test-Path "heroui-mcp-server")) {
    Write-Host "Cloning repository..." -ForegroundColor Yellow
    git clone https://github.com/billlzzz10/heroui-mcp-server.git
}

Set-Location heroui-mcp-server

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install --legacy-peer-deps

# Build project
Write-Host "Building project..." -ForegroundColor Yellow
npm run build

# Create start script
@"
@echo off
cd /d "%~dp0"
echo 🚀 Starting HeroUI MCP Server...
node dist/server/index.js
pause
"@ | Out-File -FilePath "start-mcp.bat" -Encoding ASCII

# Auto-configure clients
Write-Host "Auto-configuring clients..." -ForegroundColor Yellow
node -e "
const os = require('os');
const path = require('path');
const fs = require('fs');

const home = os.homedir();
const serverPath = process.cwd();

// Claude Desktop config for Windows
const configPath = path.join(home, 'AppData/Roaming/Claude/claude_desktop_config.json');
const configDir = path.dirname(configPath);

// Create config directory if not exists
if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
}

// Create or update config
let config = {};
if (fs.existsSync(configPath)) {
    try {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {
        config = {};
    }
}

if (!config.mcpServers) config.mcpServers = {};

config.mcpServers.heroui = {
    command: 'node',
    args: [path.join(serverPath, 'dist/server/index.js').replace(/\\/g, '/')],
    cwd: serverPath.replace(/\\/g, '/')
};

fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log('✅ Claude Desktop configured');
"

Write-Host ""
Write-Host "✅ Installation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Next steps:" -ForegroundColor Cyan
Write-Host "1. Start server: .\start-mcp.bat" -ForegroundColor White
Write-Host "2. Or run directly: node dist/server/index.js" -ForegroundColor White
Write-Host "3. Server will be available for AI clients" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "- Demo prompts: DEMO_PROMPTS.md" -ForegroundColor White
Write-Host "- Cross-platform setup: CROSS_PLATFORM_SETUP.md" -ForegroundColor White
Write-Host ""
Write-Host "🤖 Supported clients: Claude Desktop, ChatGPT, AWS Q, Cursor, VS Code, Tree.ai" -ForegroundColor Cyan
