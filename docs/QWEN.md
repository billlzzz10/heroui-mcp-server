# HeroUI MCP Server - Project Context

## Project Overview

HeroUI MCP Server is a Model Context Protocol (MCP) server designed to help create and manage UI components efficiently. It provides a comprehensive toolset for generating various UI components, layout systems, theme management, canvas tools, and advanced features like markdown parsing and mindmap creation. The project is built with TypeScript and follows modern development practices with strict type checking, comprehensive testing, and MCP protocol compliance.

### Key Features
- **UI Components**: Button components with various variants, input fields with validation, card and modal components
- **Layout System**: Grid systems, flexbox layouts, responsive layouts, custom layouts
- **Theme Management**: Color themes, typography themes, spacing themes, custom themes
- **Canvas Tools**: Drawing tools, shape tools, text rendering, image manipulation, animation tools
- **Advanced Tools**: Markdown parser, mindmap converter, template management

### Architecture
The server follows a modular architecture with tools organized by category:
- **Components**: 16 component tools (HERO_CMP_01 to HERO_CMP_16)
- **Layout**: 5 layout tools (HERO_LAY_01 to HERO_LAY_05) 
- **Theme**: 4 theme tools (HERO_THM_01 to HERO_THM_04)
- **Canvas**: 6 canvas tools (HERO_CVS_01 to HERO_CVS_06)
- **Templates**: 6 template tools (HERO_TMP_01 to HERO_TMP_06)
- **Advanced**: 11 advanced tools (HERO_ADV_01 to HERO_ADV_11)

## Building and Running

### Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0
- MCP-compatible client (such as Claude Desktop)

### Installation
```bash
git clone https://github.com/billlzzz10/heroui-mcp-server.git
cd heroui-mcp-server
npm install
npm run build
```

### Running the Server
```bash
# Development mode
npm run dev

# Production mode
npm run build && npm start

# Using Docker
npm run docker:build
npm run docker:run
```

### Testing and Quality Assurance
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix lint issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

### Development Scripts
- `npm run tools list`: List all available tools
- `npm run tools check`: Check tools integrity
- `npm run tools search <query>`: Search tools
- `npm run docs:build`: Build API documentation
- `npm run release`: Create a new release with standard-version

## Development Conventions

### Code Structure
- **src/server/**: Main server implementation using @modelcontextprotocol/sdk
- **src/tools/**: Tool implementations organized by category
  - components/, layout/, theme/, canvas/, templates/, advanced/, general/
- **src/memory/**: Session management, summarization, and memory trimming
- **src/objects/**: CRUD operations, schemas, and storage layer
- **src/utils/**: Utility functions (hashing, responsive utilities, validation)
- **data/**: Cache, object storage, and template storage
- **docs/**: Documentation files
- **tests/**: Test files

### Tool Naming Convention
Tools follow the pattern `HERO_[TYPE]_[NUMBER]` where:
- TYPE: CMP (Components), LAY (Layout), THM (Theme), CVS (Canvas), TMP (Template), ADV (Advanced)
- NUMBER: Sequential number within the category

### Code Standards
- TypeScript strict mode is enforced
- ESLint and Prettier for code quality and formatting
- JSDoc for public APIs
- Zod for schema validation
- Fastify framework conventions

### Testing Standards
- TDD (Test-Driven Development) is mandatory
- Red-Green-Refactor cycle strictly enforced
- Focus on integration testing for MCP protocol compliance
- Structure logging required for MCP operations

## Project Constitution & Principles

The project follows these core principles:
- **Library-First Architecture**: Every feature starts as a standalone library
- **CLI Interface via MCP**: All functionality exposed via Model Context Protocol
- **Test-First**: TDD mandatory with strict enforcement
- **Integration Testing for MCP**: Focus on MCP protocol compliance and inter-service communication
- **Observability & Performance**: Structured logging required for MCP operations

## MCP Protocol Integration

The server integrates with the Model Context Protocol through:
- Standard MCP server implementation using @modelcontextprotocol/sdk
- STDIO transport for communication
- Tool listing and execution endpoints
- JSON schema validation for all inputs
- Proper error handling and response formatting

To use with Claude Desktop or other MCP clients, add to configuration:
```json
{
  "mcpServers": {
    "heroui": {
      "command": "node",
      "args": ["/path/to/heroui-mcp-server/dist/server/index.js"],
      "cwd": "/path/to/heroui-mcp-server"
    }
  }
}
```

## Adding New Tools

To add a new tool:
1. Create a new file in the appropriate category directory (src/tools/[category]/)
2. Follow the tool template pattern with name, description, inputSchema, and execute function
3. Export the tool from the category index.ts file
4. Register the tool in the server index.ts file
5. Write tests for the new functionality
6. Update documentation

Example tool structure:
```typescript
import { z } from 'zod';

export const HERO_NEW_01 = {
  name: 'tool_name',
  description: 'Tool description',
  inputSchema: {
    // Zod schema definition
  },
  execute: async (args: any) => {
    // Implementation
    return { result: 'success' };
  }
};
```

## Deployment Options

The project supports multiple deployment options:
- **Direct Node.js**: Build and run with npm start
- **Docker**: Multi-stage Dockerfile with production and development images
- **Docker Compose**: Configuration for containerized deployment

## Development Workflow

1. Fork and clone the repository
2. Install dependencies with `npm install`
3. Create a feature branch with appropriate naming convention
4. Make changes following the coding standards
5. Write tests for new functionality
6. Run all tests and linting
7. Submit a pull request with proper description