# HeroUI MCP Server - Architecture

## 🏗️ System Architecture

### Core Concepts

**CANNON Framework**: Markdown ↔ Outline ↔ MindMap
- Markdown เป็นตัวแทนข้อความของ Outline
- Outline คือโครงสร้างลำดับชั้น  
- MindMap คือ Outline แบบกราฟต้นไม้

### Object Schemas (8 Types)

All objects extend base schema with common metadata:

```typescript
interface BaseObject {
  hash: string;           // SHA256
  objectType: string;
  schemaVersion: string;  // semver
  metadata: {
    name?: string;
    createdAt: string;    // ISO 8601
    createdBy: 'user' | 'ai' | 'system';
    tags?: string[];
    usageCount: number;
    notes?: string;
  }
}
```

### Component Mapping

| UIPageSpec Component | HeroUI JSX |
|---------------------|------------|
| `Heading`           | `<h1>`, `<h2>` |
| `Text`              | `<p>` |
| `Button`            | `<button>` |
| `Input`             | `<input>` |
| `Card`              | `<div>` |
| `Box`               | `<div>` |

### Tool Structure (Smithery Standard)

```typescript
export const HERO_XXX_XX = createHeroTool({
  name: 'tool_name',
  description: 'Tool description',
  inputSchema: z.object({
    // Zod validation schema
  }),
  execute: async (args) => {
    // Tool implementation
    return result;
  }
});
```

## 🔧 Development Workflow

1. **Generate Tool**: `npm run generate category number name`
2. **Development**: `npm run dev` (Smithery server)
3. **Testing**: `npm test`
4. **Build**: `npm run build`

## 📁 Project Structure

```
src/
├── tools/           # Tool categories
│   ├── components/  # UI Components (16 tools)
│   ├── layout/      # Layout tools (5 tools)
│   ├── theme/       # Theme tools (4 tools)
│   ├── canvas/      # Canvas tools (6 tools)
│   ├── templates/   # Templates (6 tools)
│   ├── advanced/    # Advanced tools (11 tools)
│   └── general/     # General utilities
├── server/          # MCP server
├── memory/          # Session management
├── objects/         # Object schemas & CRUD
├── utils/           # Utilities & validation
└── smithery.ts      # Smithery template
```
