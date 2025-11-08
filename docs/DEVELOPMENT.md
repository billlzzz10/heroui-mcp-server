# HeroUI MCP Server - Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Installation
```bash
git clone <repository>
cd heroui-mcp-server
npm install
npm run build
```

### Development Commands
```bash
# Development server (Smithery)
npm run dev

# Generate new tool
npm run generate components 03 create_card "Create card component"

# Testing
npm test
npm run test:watch

# Build
npm run build
npm start
```

## 🛠️ Creating New Tools

### 1. Using Generator
```bash
npm run generate <category> <number> <name> [description]
```

Example:
```bash
npm run generate components 03 create_card "Create card component"
```

### 2. Manual Creation

```typescript
// src/tools/components/HERO_CMP_03.ts
import { createHeroTool } from '../smithery-template.js';
import { z } from 'zod';

export const HERO_CMP_03 = createHeroTool({
  name: 'create_card',
  description: 'Create card component with title and content',
  inputSchema: z.object({
    title: z.string().describe('Card title'),
    content: z.string().describe('Card content'),
    variant: z.enum(['default', 'bordered', 'shadow']).optional()
  }),
  execute: async ({ title, content, variant = 'default' }) => {
    const cardHtml = `
<div class="card card-${variant}">
  <div class="card-header">
    <h3>${title}</h3>
  </div>
  <div class="card-body">
    <p>${content}</p>
  </div>
</div>`;
    
    return cardHtml;
  }
});
```

### 3. Update Index
```typescript
// src/tools/components/index.ts
export { HERO_CMP_03 } from './HERO_CMP_03.js';
```

## 🧪 Testing

### Unit Tests
```typescript
// tests/components/card.test.ts
import { HERO_CMP_03 } from '../../src/tools/components/HERO_CMP_03.js';

describe('HERO_CMP_03 - create_card', () => {
  it('should create card with title and content', async () => {
    const result = await HERO_CMP_03.execute({
      title: 'Test Card',
      content: 'Test content'
    });
    
    expect(result.content[0].text).toContain('Test Card');
    expect(result.content[0].text).toContain('Test content');
  });
});
```

### Integration Tests
```bash
npm run test:integration
```

## 📝 Code Standards

### Naming Convention
- Tools: `HERO_[CATEGORY]_[NUMBER]` (e.g., `HERO_CMP_01`)
- Files: `HERO_CMP_01.ts`
- Functions: `camelCase`
- Constants: `UPPER_CASE`

### Error Handling
```typescript
import { handleToolError, ValidationError } from '../utils/validation.js';

export const myTool = createHeroTool({
  // ...
  execute: async (args) => {
    try {
      // Tool logic
      return result;
    } catch (error) {
      return handleToolError(error);
    }
  }
});
```

### Validation
```typescript
import { z } from 'zod';

const inputSchema = z.object({
  required_field: z.string().min(1),
  optional_field: z.number().optional().default(0),
  enum_field: z.enum(['option1', 'option2'])
});
```

## 🔧 Debugging

### Development Server
```bash
npm run dev -- --debug
```

### Tool Testing
```bash
# Test specific tool
node -e "
const tool = require('./dist/tools/components/HERO_CMP_01.js');
console.log(JSON.stringify(tool.HERO_CMP_01, null, 2));
"
```

### MCP Client Testing
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "create_button",
    "arguments": {
      "text": "Click Me",
      "variant": "primary"
    }
  }
}
```

## 📚 Resources

- [MCP Specification](https://modelcontextprotocol.io/)
- [Smithery Documentation](https://smithery.ai/)
- [Zod Documentation](https://zod.dev/)
- [HeroUI Components](https://heroui.com/)
