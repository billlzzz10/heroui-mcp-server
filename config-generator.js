const fs = require('fs');
const path = require('path');
const os = require('os');

function generateConfig(clientType, serverPath) {
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
        },
        awsq: {
            darwin: path.join(home, '.aws/q_config.json'),
            linux: path.join(home, '.aws/q_config.json'),
            win32: path.join(home, '.aws/q_config.json')
        }
    };

    const configPath = configs[clientType]?.[platform] || configs[clientType]?.linux;
    if (!configPath) {
        throw new Error(`Unsupported client type: ${clientType}`);
    }

    // Create directory if not exists
    const configDir = path.dirname(configPath);
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
    }

    // Read existing config or create new
    let existingConfig = {};
    if (fs.existsSync(configPath)) {
        try {
            existingConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        } catch (error) {
            console.warn(`Warning: Could not parse existing config at ${configPath}`);
            existingConfig = {};
        }
    }

    // Generate new config based on client type
    let newConfig;
    const serverIndexPath = path.join(serverPath, 'dist/server/index.js');
    
    switch (clientType) {
        case 'claude':
            if (!existingConfig.mcpServers) existingConfig.mcpServers = {};
            existingConfig.mcpServers.heroui = {
                command: 'node',
                args: [serverIndexPath],
                cwd: serverPath,
                env: {
                    NODE_ENV: 'production',
                    LOG_LEVEL: 'info',
                    SESSION_TTL: '3600'
                }
            };
            newConfig = existingConfig;
            break;

        case 'cursor':
            if (!existingConfig.mcpServers) existingConfig.mcpServers = {};
            existingConfig.mcpServers.heroui = {
                command: 'node',
                args: [serverIndexPath],
                cwd: serverPath,
                env: {
                    NODE_ENV: 'development',
                    LOG_LEVEL: 'debug'
                }
            };
            newConfig = existingConfig;
            break;

        case 'vscode':
            if (!existingConfig['mcp.servers']) existingConfig['mcp.servers'] = {};
            existingConfig['mcp.servers'].heroui = {
                command: 'node',
                args: [serverIndexPath],
                cwd: serverPath,
                env: {
                    NODE_ENV: 'development',
                    ENABLE_WEBSOCKETS: 'true'
                }
            };
            newConfig = existingConfig;
            break;

        case 'awsq':
            if (!existingConfig.mcpServers) existingConfig.mcpServers = {};
            existingConfig.mcpServers.heroui = {
                command: 'node',
                args: [serverIndexPath],
                cwd: serverPath,
                env: {
                    AWS_REGION: process.env.AWS_REGION || 'us-east-1',
                    NODE_ENV: 'production',
                    ENABLE_AI_GENERATION: 'false'
                }
            };
            newConfig = existingConfig;
            break;

        default:
            throw new Error(`Unsupported client type: ${clientType}`);
    }

    // Write config
    fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
    console.log(`✅ ${clientType} configuration updated at ${configPath}`);
    
    return { configPath, config: newConfig };
}

function listSupportedClients() {
    return ['claude', 'cursor', 'vscode', 'awsq'];
}

function detectInstalledClients() {
    const platform = os.platform();
    const home = os.homedir();
    const installed = [];

    const clientPaths = {
        claude: {
            darwin: ['/Applications/Claude.app'],
            linux: [path.join(home, '.local/share/applications/claude.desktop')],
            win32: [path.join(home, 'AppData/Local/Claude')]
        },
        cursor: {
            darwin: ['/Applications/Cursor.app'],
            linux: ['/usr/bin/cursor', path.join(home, '.local/bin/cursor')],
            win32: [path.join(home, 'AppData/Local/Programs/cursor')]
        },
        vscode: {
            darwin: ['/Applications/Visual Studio Code.app'],
            linux: ['/usr/bin/code', '/snap/bin/code'],
            win32: [path.join(home, 'AppData/Local/Programs/Microsoft VS Code')]
        }
    };

    Object.entries(clientPaths).forEach(([client, paths]) => {
        const clientPlatformPaths = paths[platform] || [];
        const isInstalled = clientPlatformPaths.some(p => fs.existsSync(p));
        if (isInstalled) {
            installed.push(client);
        }
    });

    return installed;
}

function generateAllConfigs(serverPath) {
    const installedClients = detectInstalledClients();
    const results = [];

    console.log(`🔍 Detected installed clients: ${installedClients.join(', ')}`);
    console.log('');

    installedClients.forEach(client => {
        try {
            const result = generateConfig(client, serverPath);
            results.push({ client, success: true, ...result });
            console.log(`✅ Configured ${client}`);
        } catch (error) {
            results.push({ client, success: false, error: error.message });
            console.log(`❌ Failed to configure ${client}: ${error.message}`);
        }
    });

    return results;
}

// CLI usage
if (require.main === module) {
    const [,, command, ...args] = process.argv;

    switch (command) {
        case 'list':
            console.log('Supported clients:', listSupportedClients().join(', '));
            break;

        case 'detect':
            const installed = detectInstalledClients();
            console.log('Installed clients:', installed.join(', '));
            break;

        case 'generate':
            const [clientType, serverPath] = args;
            if (!clientType || !serverPath) {
                console.log('Usage: node config-generator.js generate <client> <server-path>');
                console.log('Clients:', listSupportedClients().join(', '));
                process.exit(1);
            }
            try {
                generateConfig(clientType, serverPath);
            } catch (error) {
                console.error('Error:', error.message);
                process.exit(1);
            }
            break;

        case 'auto':
            const [autoServerPath] = args;
            if (!autoServerPath) {
                console.log('Usage: node config-generator.js auto <server-path>');
                process.exit(1);
            }
            generateAllConfigs(autoServerPath);
            break;

        default:
            console.log('HeroUI MCP Configuration Generator');
            console.log('');
            console.log('Commands:');
            console.log('  list                     - List supported clients');
            console.log('  detect                   - Detect installed clients');
            console.log('  generate <client> <path> - Generate config for specific client');
            console.log('  auto <path>              - Auto-configure all detected clients');
            console.log('');
            console.log('Examples:');
            console.log('  node config-generator.js list');
            console.log('  node config-generator.js detect');
            console.log('  node config-generator.js generate claude /path/to/heroui-mcp-server');
            console.log('  node config-generator.js auto /path/to/heroui-mcp-server');
    }
}

module.exports = { 
    generateConfig, 
    listSupportedClients, 
    detectInstalledClients, 
    generateAllConfigs 
};
