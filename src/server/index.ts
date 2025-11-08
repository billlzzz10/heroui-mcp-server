#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Import all tools
import {
  HERO_CMP_01,
  HERO_CMP_02,
  HERO_LAY_01,
  HERO_ADV_01,
  HERO_ADV_02,
  HERO_ADV_03,
  HERO_ADV_04,
  HERO_AI_01,
  HERO_AI_02,
  HERO_AI_03,
  HERO_AI_04
} from '../tools/index.js';

// Create server instance
const server = new Server(
  {
    name: 'heroui-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register all tools
const tools = [
  HERO_CMP_01,
  HERO_CMP_02,
  HERO_LAY_01,
  HERO_ADV_01,
  HERO_ADV_02,
  HERO_ADV_03,
  HERO_ADV_04,
  HERO_AI_01,
  HERO_AI_02,
  HERO_AI_03,
  HERO_AI_04
];

// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: tools.map(tool => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
    })),
  };
});

// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  const tool = tools.find(t => t.name === name);
  if (!tool) {
    throw new Error(`Unknown tool: ${name}`);
  }
  
  try {
    const result = await tool.execute(args || {});
    return result;
  } catch (error) {
    throw new Error(`Tool execution failed: ${error instanceof Error ? error.message : String(error)}`);
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('HeroUI MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
