# API Reference

## Overview

HeroUI MCP Server ให้บริการ API ที่ครอบคลุมสำหรับการสร้างและจัดการ UI components ผ่าน Model Context Protocol

## Base URL

```
http://localhost:3000/api
```

## Authentication

ปัจจุบันไม่ต้องการ authentication แต่อาจมีการเพิ่มในอนาคต

## Components API

### Button Component (HERO_CMP_01)

#### Create Button
```typescript
POST /components/button

// Request Body
{
  "text": "Click Me",
  "variant": "primary" | "secondary" | "danger" | "success",
  "size": "small" | "medium" | "large",
  "disabled": boolean,
  "onClick": string // JavaScript function
}

// Response
{
  "id": "btn_123",
  "html": "<button class='hero-btn hero-btn-primary'>Click Me</button>",
  "css": ".hero-btn { ... }",
  "js": "function onClick() { ... }"
}
```

### Input Component (HERO_CMP_02)

#### Create Input
```typescript
POST /components/input

// Request Body
{
  "type": "text" | "email" | "password" | "number",
  "placeholder": string,
  "label": string,
  "required": boolean,
  "validation": {
    "pattern": string,
    "minLength": number,
    "maxLength": number
  }
}
```

### Card Component (HERO_CMP_03)

#### Create Card
```typescript
POST /components/card

// Request Body
{
  "title": string,
  "content": string,
  "image": string,
  "actions": Array<{
    "text": string,
    "action": string,
    "variant": string
  }>
}
```

## Layout API

### Grid Layout (HERO_LAY_01)

#### Create Grid
```typescript
POST /layout/grid

// Request Body
{
  "columns": number,
  "rows": number,
  "gap": string,
  "responsive": {
    "mobile": number,
    "tablet": number,
    "desktop": number
  }
}
```

### Flexbox Layout (HERO_LAY_02)

#### Create Flexbox
```typescript
POST /layout/flexbox

// Request Body
{
  "direction": "row" | "column",
  "justify": "start" | "center" | "end" | "space-between" | "space-around",
  "align": "start" | "center" | "end" | "stretch",
  "wrap": boolean
}
```

## Theme API

### Color Theme (HERO_THM_01)

#### Set Color Theme
```typescript
POST /theme/colors

// Request Body
{
  "primary": string,
  "secondary": string,
  "accent": string,
  "background": string,
  "text": string,
  "error": string,
  "warning": string,
  "success": string
}
```

### Typography Theme (HERO_THM_02)

#### Set Typography
```typescript
POST /theme/typography

// Request Body
{
  "fontFamily": string,
  "fontSize": {
    "xs": string,
    "sm": string,
    "md": string,
    "lg": string,
    "xl": string
  },
  "fontWeight": {
    "light": number,
    "normal": number,
    "medium": number,
    "bold": number
  }
}
```

## Canvas API

### Basic Drawing (HERO_CVS_01)

#### Create Canvas
```typescript
POST /canvas/create

// Request Body
{
  "width": number,
  "height": number,
  "background": string
}

// Response
{
  "canvasId": string,
  "element": string
}
```

#### Draw Shape
```typescript
POST /canvas/{canvasId}/shape

// Request Body
{
  "type": "rectangle" | "circle" | "line" | "polygon",
  "x": number,
  "y": number,
  "width": number,
  "height": number,
  "fill": string,
  "stroke": string,
  "strokeWidth": number
}
```

## MindMap API

### Parse Markdown (HERO_ADV_12)

#### Parse Markdown to Outline
```typescript
POST /markdown/parse

// Request Body
{
  "markdown": "# Project\n## Tasks\n- [ ] Setup\n- [x] Done"
}

// Response
{
  "id": "outline_123",
  "title": "Project",
  "sections": [
    {
      "id": "s1",
      "headingLevel": 2,
      "title": "Tasks",
      "tasks": [
        {
          "id": "t1",
          "content": "Setup",
          "status": "todo"
        }
      ]
    }
  ]
}
```

#### Convert Between Formats
```typescript
POST /convert

// Request Body
{
  "fromFormat": "outline",
  "toFormat": "mindmap",
  "payload": {
    "id": "outline_123",
    "title": "Project",
    "sections": [...]
  }
}

// Response
{
  "format": "mindmap",
  "result": {
    "id": "mindmap_123",
    "nodes": [
      {
        "id": "root",
        "parentId": null,
        "title": "Project",
        "role": "concept"
      }
    ]
  }
}
```

### Create MindMap Component (HERO_CMP_17)

#### Create Interactive MindMap
```typescript
POST /components/mindmap

// Request Body
{
  "nodes": [
    {
      "id": "root",
      "parentId": null,
      "title": "Project Alpha",
      "role": "concept"
    },
    {
      "id": "tasks",
      "parentId": "root",
      "title": "Tasks",
      "role": "concept"
    }
  ],
  "layout": "tree-right"
}

// Response
{
  "id": "mindmap_component_123",
  "html": "<div class='hero-mindmap'>...</div>",
  "css": ".hero-mindmap { ... }",
  "js": "// Interactive mindmap logic"
}
```

## Advanced Tools API

### Animation (HERO_ADV_01)

#### Create Animation
```typescript
POST /advanced/animation

// Request Body
{
  "target": string, // CSS selector
  "keyframes": Array<{
    "offset": number,
    "properties": object
  }>,
  "duration": number,
  "easing": string,
  "iterations": number | "infinite"
}
```

### State Management (HERO_ADV_02)

#### Create Store
```typescript
POST /advanced/store

// Request Body
{
  "initialState": object,
  "reducers": object,
  "middleware": Array<string>
}
```

## Templates API

### Page Template (HERO_TPL_01)

#### Create Page
```typescript
POST /templates/page

// Request Body
{
  "layout": string,
  "header": object,
  "content": Array<object>,
  "footer": object,
  "meta": {
    "title": string,
    "description": string,
    "keywords": Array<string>
  }
}
```

## Memory Management API

### Session Management

#### Create Session
```typescript
POST /memory/session

// Request Body
{
  "userId": string,
  "data": object,
  "ttl": number // seconds
}
```

#### Get Session
```typescript
GET /memory/session/{sessionId}

// Response
{
  "sessionId": string,
  "userId": string,
  "data": object,
  "createdAt": string,
  "expiresAt": string
}
```

## Object Storage API

### Store Object
```typescript
POST /objects

// Request Body
{
  "key": string,
  "value": any,
  "metadata": object
}
```

### Retrieve Object
```typescript
GET /objects/{key}

// Response
{
  "key": string,
  "value": any,
  "metadata": object,
  "createdAt": string,
  "updatedAt": string
}
```

## Error Handling

### Error Response Format
```typescript
{
  "error": {
    "code": string,
    "message": string,
    "details": object
  }
}
```

### Common Error Codes

- `INVALID_REQUEST`: Request body ไม่ถูกต้อง
- `NOT_FOUND`: Resource ไม่พบ
- `VALIDATION_ERROR`: ข้อมูลไม่ผ่าน validation
- `INTERNAL_ERROR`: ข้อผิดพลาดภายในเซิร์ฟเวอร์

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per API key

## Webhooks

### Component Events
```typescript
POST /webhooks/components

// Event Types
- component.created
- component.updated
- component.deleted
```

### Theme Events
```typescript
POST /webhooks/themes

// Event Types
- theme.applied
- theme.updated
```

## SDK Usage

### JavaScript/TypeScript
```typescript
import { HeroUIClient } from '@heroui/client';

const client = new HeroUIClient({
  baseURL: 'http://localhost:3000',
  apiKey: 'your-api-key'
});

// Create button
const button = await client.components.createButton({
  text: 'Hello World',
  variant: 'primary'
});

// Create layout
const grid = await client.layout.createGrid({
  columns: 3,
  gap: '1rem'
});
```

### Python
```python
from heroui import HeroUIClient

client = HeroUIClient(
    base_url='http://localhost:3000',
    api_key='your-api-key'
)

# Create button
button = client.components.create_button(
    text='Hello World',
    variant='primary'
)
```

## Examples

### Complete Page Example
```typescript
// 1. Create theme
const theme = await client.theme.setColors({
  primary: '#007bff',
  secondary: '#6c757d'
});

// 2. Create layout
const layout = await client.layout.createGrid({
  columns: 12,
  gap: '1rem'
});

// 3. Create components
const header = await client.components.createCard({
  title: 'Welcome',
  content: 'This is a sample page'
});

const button = await client.components.createButton({
  text: 'Get Started',
  variant: 'primary'
});

// 4. Create page template
const page = await client.templates.createPage({
  layout: layout.id,
  content: [header.id, button.id]
});
```
