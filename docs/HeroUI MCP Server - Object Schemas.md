# HeroUI MCP Server - Object Schemas

This document outlines the 8 core data structures (schemas) used within the HeroUI MCP Server. All objects share a common base structure.

## Base Object Schema

All objects extend this base schema, providing common metadata fields.

```json
{
  "hash": "string (SHA256)",
  "objectType": "string",
  "schemaVersion": "string (semver)",
  "metadata": {
    "name": "string (optional)",
    "createdAt": "string (ISO 8601)",
    "createdBy": "'user' | 'ai' | 'system'",
    "tags": "string[] (optional)",
    "usageCount": "number",
    "notes": "string (optional)"
  }
}
```

---

### 1. Color Palette Object

Defines a set of colors for a UI theme, including primary, secondary, and semantic colors.

**Example:**
```json
{
  "hash": "cp_default_001",
  "objectType": "color_palette",
  "schemaVersion": "1.0.0",
  "generationMethod": "manual",
  "baseColor": "#3b82f6",
  "palette": { ... },
  "semantic": { ... },
  "metadata": { ... }
}
```

---

### 2. Typography Scale Object

Defines font families, scale ratios, and a hierarchy for text elements like headings and body text.

**Example:**
```json
{
  "hash": "ts_default_001",
  "objectType": "typography_scale",
  "schemaVersion": "1.0.0",
  "fontFamily": "Inter, system-ui, sans-serif",
  "scaleRatio": 1.25,
  "hierarchy": { ... },
  "metadata": { ... }
}
```

---

### 3. Spacing System Object

Defines a consistent spacing scale based on a base unit, used for margins, paddings, and gaps.

**Example:**
```json
{
  "hash": "ss_default_001",
  "objectType": "spacing_system",
  "schemaVersion": "1.0.0",
  "baseUnit": 4,
  "scale": {
    "xs": 4,
    "sm": 8,
    "md": 16
  },
  "metadata": { ... }
}
```

---

### 4. Shadow Style Object

Defines a set of shadow elevations (e.g., sm, md, lg) for creating depth in the UI.

**Example:**
```json
{
  "hash": "sh_default_001",
  "objectType": "shadow_style",
  "schemaVersion": "1.0.0",
  "color": "rgba(0, 0, 0, 0.1)",
  "elevations": { ... },
  "metadata": { ... }
}
```

---

### 5. Interaction Style Object

Defines styles for different component states (hover, active, focus) and transition properties.

**Example:**
```json
{
  "hash": "is_default_001",
  "objectType": "interaction_style",
  "schemaVersion": "1.0.0",
  "states": { ... },
  "transitions": { ... },
  "metadata": { ... }
}
```

---

### 6. Component Variant Object

Represents a specific instance of a UI component (like a Button or Card) with defined properties and styles.

**Example:**
```json
{
  "hash": "cv_button_001",
  "objectType": "component_variant",
  "schemaVersion": "1.0.0",
  "targetComponent": "Button",
  "props": { "variant": "solid" },
  "styleObjectHashes": { ... },
  "children": "Click me",
  "metadata": { ... }
}
```

---

### 7. Layout Composition Object

Defines the structure of a part of the UI, using containers like Flex or Grid, and holds slots for other components or layouts.

**Example:**
```json
{
  "hash": "lc_hero_001",
  "objectType": "layout_composition",
  "schemaVersion": "1.0.0",
  "containerType": "flex",
  "containerStyles": { ... },
  "slots": {
    "main": [ { "hash": "cv_button_001", ... } ]
  },
  "metadata": { ... }
}
```

---

### 8. Template Object

A complete page or screen template that combines a root layout with recommended styles.

**Example:**
```json
{
  "hash": "tpl_landing_001",
  "objectType": "template",
  "schemaVersion": "1.0.0",
  "templateType": "landing",
  "rootLayoutHash": "lc_hero_001",
  "recommendedStyleHashes": { ... },
  "metadata": { ... }
}
```

