// Cursor IDE Integration for HeroUI MCP Server

export interface CursorMCPConfig {
  name: string;
  command: string;
  args: string[];
  cwd: string;
  env?: Record<string, string>;
}

export class CursorHeroUIIntegration {
  private mcpConfig: CursorMCPConfig;

  constructor(serverPath: string) {
    this.mcpConfig = {
      name: 'heroui',
      command: 'node',
      args: [`${serverPath}/dist/server/index.js`],
      cwd: serverPath,
      env: {
        NODE_ENV: 'production'
      }
    };
  }

  // Generate Cursor-specific configuration
  generateConfig(): string {
    return JSON.stringify({
      mcpServers: {
        [this.mcpConfig.name]: {
          command: this.mcpConfig.command,
          args: this.mcpConfig.args,
          cwd: this.mcpConfig.cwd,
          env: this.mcpConfig.env
        }
      }
    }, null, 2);
  }

  // Cursor completion suggestions
  getCompletionSuggestions() {
    return [
      {
        label: 'heroui-button',
        insertText: 'create_button text="${1:Button Text}" variant="${2:primary}" size="${3:medium}"',
        documentation: 'Create a customizable button component',
        kind: 'Snippet',
        detail: 'HeroUI MCP - Button Component'
      },
      {
        label: 'heroui-input',
        insertText: 'create_input type="${1:text}" placeholder="${2:Enter text}" label="${3:Label}" required=${4:false}',
        documentation: 'Create an input field with validation',
        kind: 'Snippet',
        detail: 'HeroUI MCP - Input Component'
      },
      {
        label: 'heroui-grid',
        insertText: 'create_grid columns=${1:3} gap="${2:medium}" responsive=${3:true}',
        documentation: 'Create a responsive CSS grid layout',
        kind: 'Snippet',
        detail: 'HeroUI MCP - Grid Layout'
      },
      {
        label: 'heroui-generate',
        insertText: 'generate_component description="${1:Describe your component}"',
        documentation: 'Generate component using AI',
        kind: 'Snippet',
        detail: 'HeroUI MCP - AI Generation'
      },
      {
        label: 'heroui-form',
        insertText: 'generate_form description="${1:Contact form with name and email}"',
        documentation: 'Generate form using AI',
        kind: 'Snippet',
        detail: 'HeroUI MCP - AI Form Generation'
      }
    ];
  }

  // Cursor hover information
  getHoverInfo(toolName: string): string {
    const toolInfo = {
      'create_button': {
        description: 'Creates a customizable button component with various styles and states',
        parameters: [
          'text (required): Button text content',
          'variant: primary, secondary, success, danger, warning, info',
          'size: small, medium, large',
          'disabled: boolean',
          'onClick: JavaScript click handler'
        ],
        example: 'create_button text="Submit" variant="primary" size="large"'
      },
      'create_input': {
        description: 'Creates a customizable input field with validation and styling',
        parameters: [
          'type: text, email, password, number, tel, url',
          'placeholder: Placeholder text',
          'label: Input label',
          'required: boolean',
          'disabled: boolean',
          'size: small, medium, large'
        ],
        example: 'create_input type="email" placeholder="Enter email" label="Email" required=true'
      },
      'generate_component': {
        description: 'Generates UI components using AI based on natural language descriptions',
        parameters: [
          'description (required): Natural language description',
          'componentType: Specific component type (optional)'
        ],
        example: 'generate_component description="A red delete button with icon"'
      }
    };

    const info = toolInfo[toolName as keyof typeof toolInfo];
    if (!info) return '';

    return `**${toolName}**

${info.description}

**Parameters:**
${info.parameters.map(p => `• ${p}`).join('\n')}

**Example:**
\`\`\`
${info.example}
\`\`\``;
  }

  // Generate Cursor workspace settings
  generateWorkspaceSettings() {
    return {
      "mcp.servers": {
        "heroui": this.mcpConfig
      },
      "mcp.autoComplete": {
        "enabled": true,
        "triggerCharacters": ["h", "@"]
      },
      "mcp.hover": {
        "enabled": true
      },
      "files.associations": {
        "*.heroui": "javascript"
      }
    };
  }
}

// Cursor extension manifest
export const cursorExtensionManifest = {
  name: "heroui-mcp-cursor",
  displayName: "HeroUI MCP for Cursor",
  description: "UI Component generator with MCP integration for Cursor IDE",
  version: "1.0.0",
  publisher: "heroui",
  engines: {
    cursor: "^1.0.0"
  },
  categories: ["Other", "Snippets"],
  keywords: ["mcp", "ui", "components", "ai", "generation"],
  contributes: {
    commands: [
      {
        command: "heroui.createButton",
        title: "Create Button Component",
        category: "HeroUI"
      },
      {
        command: "heroui.createInput",
        title: "Create Input Component", 
        category: "HeroUI"
      },
      {
        command: "heroui.generateComponent",
        title: "Generate Component with AI",
        category: "HeroUI"
      },
      {
        command: "heroui.openPreview",
        title: "Open Component Preview",
        category: "HeroUI"
      }
    ],
    keybindings: [
      {
        command: "heroui.generateComponent",
        key: "ctrl+shift+h",
        mac: "cmd+shift+h"
      }
    ],
    snippets: [
      {
        language: "javascript",
        path: "./snippets/heroui.json"
      },
      {
        language: "typescript", 
        path: "./snippets/heroui.json"
      }
    ],
    configuration: {
      title: "HeroUI MCP",
      properties: {
        "heroui.serverPath": {
          type: "string",
          description: "Path to HeroUI MCP Server"
        },
        "heroui.autoComplete": {
          type: "boolean",
          default: true,
          description: "Enable auto-completion"
        }
      }
    }
  }
};

export default CursorHeroUIIntegration;
