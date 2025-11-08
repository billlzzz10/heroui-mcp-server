# HeroUI MCP Server - API Reference

## 🔧 Available Tools

### Components (HERO_CMP_XX)

#### HERO_CMP_01 - create_button
Create customizable button components

**Input:**
```typescript
{
  text: string;           // Button text
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: string;       // JavaScript function
}
```

**Output:** HTML button element

#### HERO_CMP_02 - create_input
Create input field components

**Input:**
```typescript
{
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}
```

**Output:** HTML input element with label

### Layout (HERO_LAY_XX)

#### HERO_LAY_01 - create_grid
Create CSS Grid layouts

**Input:**
```typescript
{
  columns: number;        // Grid columns
  gap?: string;          // Gap size (e.g., '1rem')
  items: Array<{
    content: string;
    span?: number;       // Column span
  }>;
}
```

**Output:** CSS Grid HTML structure

### Advanced (HERO_ADV_XX)

#### HERO_ADV_01 - parse_markdown
Parse Markdown to Outline structure

**Input:**
```typescript
{
  markdown: string;       // Markdown content
  preserveIds?: boolean;  // Keep existing IDs
}
```

**Output:** Outline object with hierarchical structure

## 🎨 Object Schemas

### Base Object Schema
```typescript
interface BaseObject {
  hash: string;           // SHA256 hash
  objectType: string;     // Object type identifier
  schemaVersion: string;  // Semantic version
  metadata: {
    name?: string;
    createdAt: string;    // ISO 8601
    createdBy: 'user' | 'ai' | 'system';
    tags?: string[];
    usageCount: number;
    notes?: string;
  };
}
```

### Color Palette Object
```typescript
interface ColorPaletteObject extends BaseObject {
  objectType: 'ColorPalette';
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    light: string;
    dark: string;
  };
}
```

### Component Variant Object
```typescript
interface ComponentVariantObject extends BaseObject {
  objectType: 'ComponentVariant';
  targetComponent: string;  // e.g., 'Button', 'Card'
  variantName: string;
  props: Record<string, any>;
  styling: {
    css?: string;
    classes?: string[];
  };
}
```

### Layout Composition Object
```typescript
interface LayoutCompositionObject extends BaseObject {
  objectType: 'LayoutComposition';
  layoutType: 'flex' | 'grid' | 'absolute';
  children: Array<{
    id: string;
    type: 'component' | 'layout';
    props?: Record<string, any>;
  }>;
  styling: {
    css?: string;
    classes?: string[];
  };
}
```

## 🔄 MCP Protocol

### Tool Discovery
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list"
}
```

### Tool Execution
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "create_button",
    "arguments": {
      "text": "Click Me",
      "variant": "primary",
      "size": "large"
    }
  }
}
```

### Error Response
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "error": {
    "code": -32602,
    "message": "Invalid params",
    "data": {
      "details": ["text: Required field missing"]
    }
  }
}
```

## 🎯 Usage Examples

### Creating a Button
```javascript
// MCP Client call
const result = await mcpClient.callTool('create_button', {
  text: 'Submit Form',
  variant: 'primary',
  size: 'large',
  onClick: 'handleSubmit()'
});

console.log(result.content[0].text);
// Output: <button class="btn btn-primary btn-large" onclick="handleSubmit()">Submit Form</button>
```

### Creating a Grid Layout
```javascript
const gridResult = await mcpClient.callTool('create_grid', {
  columns: 3,
  gap: '1rem',
  items: [
    { content: '<div>Item 1</div>' },
    { content: '<div>Item 2</div>', span: 2 },
    { content: '<div>Item 3</div>' }
  ]
});
```

### Parsing Markdown
```javascript
const markdown = `
# Project Title
## Overview
- Task 1
- Task 2
## Details
Content here
`;

const outline = await mcpClient.callTool('parse_markdown', {
  markdown: markdown,
  preserveIds: false
});
```

## 🛡️ Error Codes

| Code | Message | Description |
|------|---------|-------------|
| -32602 | Invalid params | Input validation failed |
| -32603 | Internal error | Server-side error |
| -32000 | Tool not found | Requested tool doesn't exist |
| -32001 | Execution failed | Tool execution error |
