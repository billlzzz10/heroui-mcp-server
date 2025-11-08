# MindMap Usage Examples

## 1. Parse Markdown to MindMap

```bash
# Parse markdown file
curl -X POST http://localhost:3000/markdown/parse \
  -H "Content-Type: application/json" \
  -d '{"markdown": "# Project\n## Tasks\n- [ ] Setup\n- [x] Planning"}'
```

## 2. Convert to MindMap

```bash
# Convert outline to mindmap
curl -X POST http://localhost:3000/convert \
  -H "Content-Type: application/json" \
  -d '{
    "fromFormat": "outline",
    "toFormat": "mindmap", 
    "payload": {
      "id": "doc-1",
      "title": "Project",
      "sections": [...]
    }
  }'
```

## 3. Create Visual MindMap Component

```typescript
import { HeroUIClient } from 'heroui-mcp-server';

const client = new HeroUIClient();

// Create mindmap visualization
const mindmap = await client.components.createMindMap({
  nodes: [
    {
      id: 'root',
      parentId: null,
      title: 'Project Alpha',
      role: 'concept'
    },
    {
      id: 'tasks',
      parentId: 'root', 
      title: 'Tasks',
      role: 'concept'
    },
    {
      id: 'task-1',
      parentId: 'tasks',
      title: 'Setup Repository',
      role: 'task'
    }
  ],
  layout: 'tree-right'
});

console.log(mindmap.html); // Interactive SVG mindmap
```

## 4. Full Workflow: Markdown → MindMap → Visual

```typescript
// 1. Parse markdown
const outline = await client.advanced.parseMarkdown(`
# Project Alpha
## Overview
Project description

## Tasks  
- [ ] Setup repo
- [ ] Write docs
- [x] Create plan

## Resources
[Documentation](https://example.com)
`);

// 2. Convert to mindmap
const mindmap = await client.advanced.convertToMindMap(outline);

// 3. Create visual component
const visual = await client.components.createMindMap({
  nodes: mindmap.nodes,
  layout: 'radial'
});

// 4. Render in HTML
document.getElementById('mindmap').innerHTML = visual.html;
```

## 5. Export Options

```bash
# Export as PDF
curl -X POST http://localhost:3000/export \
  -d '{"mapId": "map-123", "format": "pdf"}'

# Export as JPG  
curl -X POST http://localhost:3000/export \
  -d '{"mapId": "map-123", "format": "jpg", "options": {"width": 1200}}'
```
