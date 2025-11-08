# Quick Start

เริ่มต้นใช้งาน HeroUI MCP Server ใน 5 นาที

## Installation

```bash
npm install heroui-mcp-server
```

## Basic Usage

```typescript
import { HeroUIClient } from 'heroui-mcp-server';

const client = new HeroUIClient('http://localhost:3000');

// Create a button
const button = await client.components.createButton({
  text: 'Click Me',
  variant: 'primary'
});

console.log(button.html);
```

## Next Steps

- [Full Installation Guide](GETTING_STARTED.md)
- [API Reference](API_REFERENCE.md)
- [Examples](EXAMPLES.md)
