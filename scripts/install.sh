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
        if command -v brew &> /dev/null; then
            brew install node
        else
            echo "Please install Homebrew first: https://brew.sh"
            exit 1
        fi
    elif [[ "$MACHINE" == "Linux" ]]; then
        if command -v apt-get &> /dev/null; then
            curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
            sudo apt-get install -y nodejs
        elif command -v yum &> /dev/null; then
            curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
            sudo yum install -y nodejs
        else
            echo "Please install Node.js manually from https://nodejs.org"
            exit 1
        fi
    fi
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current: $(node --version)"
    exit 1
fi

# Clone repository if not exists
if [ ! -d "heroui-mcp-server" ]; then
    echo "Cloning repository..."
    git clone https://github.com/billlzzz10/heroui-mcp-server.git
fi

cd heroui-mcp-server

# Install dependencies
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Build project
echo "Building project..."
npm run build

# Create start script
cat > start-mcp.sh << 'EOF'
#!/bin/bash
cd "$(dirname "$0")"
echo "🚀 Starting HeroUI MCP Server..."
node dist/server/index.js
EOF

chmod +x start-mcp.sh

# Auto-detect and configure clients
echo "Auto-configuring clients..."
node -e "
const os = require('os');
const path = require('path');
const fs = require('fs');

const home = os.homedir();
const platform = os.platform();
const serverPath = process.cwd();

const configs = {
    claude: {
        darwin: path.join(home, '.config/claude/claude_desktop_config.json'),
        linux: path.join(home, '.config/claude/claude_desktop_config.json'),
        win32: path.join(home, 'AppData/Roaming/Claude/claude_desktop_config.json')
    }
};

const configPath = configs.claude[platform] || configs.claude.linux;
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
    args: [path.join(serverPath, 'dist/server/index.js')],
    cwd: serverPath
};

fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log('✅ Claude Desktop configured');
"

echo ""
echo "✅ Installation complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Start server: ./start-mcp.sh"
echo "2. Or run directly: node dist/server/index.js"
echo "3. Server will be available for AI clients"
echo ""
echo "📚 Documentation:"
echo "- Demo prompts: DEMO_PROMPTS.md"
echo "- Cross-platform setup: CROSS_PLATFORM_SETUP.md"
echo ""
echo "🤖 Supported clients: Claude Desktop, ChatGPT, AWS Q, Cursor, VS Code, Tree.ai"
