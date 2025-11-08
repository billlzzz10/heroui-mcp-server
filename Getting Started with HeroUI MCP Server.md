# Getting Started with HeroUI MCP Server

This document provides instructions on how to install, run, and interact with the HeroUI MCP Server.

## Installation

1.  **Prerequisites**: Ensure you have Node.js (v18 or later) and npm installed.

2.  **Clone the repository** (or extract the provided source code).

3.  **Install dependencies**:

    ```bash
    npm install
    ```

## Running the Server

### Development Mode

For development, you can run the server with hot-reloading enabled:

```bash
npm run dev
```

The server will start, typically on port 3000, and automatically restart when you make changes to the source code.

### Production Mode

For production, first build the project, then start the server:

```bash
# 1. Build the TypeScript source into JavaScript
npm run build

# 2. Start the server
npm run start
```

## Seeding the Database

The server comes with a set of seed data (palettes, typography, components, etc.) to get you started. To load this data into the server's storage and build the search index, run:

```bash
npm run seed
```

This command reads all JSON files from `data/objects/` and `data/templates/`, validates them, and adds them to the search index.

## Calling Tools

The server exposes its capabilities through a set of tools defined according to the Model Context Protocol (MCP). You can interact with these tools via HTTP requests.

### Example 1: Listing All Tools

```bash
curl http://localhost:3000/tools
```

### Example 2: Calling the `emit_ui` Tool

This tool generates a React component from a `UIPageSpec` object.

**Endpoint**: `POST /tools/HERO_GEN_EMIT_UI_01/call`

**Body** (example `UIPageSpec`):

```json
{
    "schemaVersion": "1.0.0",
    "pageName": "MyTestPage",
    "root": {
      "hash": "lc_hero_001",
      "objectType": "layout_composition",
      "schemaVersion": "1.0.0",
      "containerType": "flex",
      "containerStyles": { "display": "flex", "flexDirection": "column" },
      "responsiveStyles": {},
      "slots": {
        "main": [
          {
            "hash": "cv_button_001",
            "objectType": "component_variant",
            "schemaVersion": "1.0.0",
            "targetComponent": "Button",
            "props": { "size": "lg" },
            "styleObjectHashes": {},
            "children": "Get Started",
            "metadata": {
              "name": "Hero CTA Button",
              "createdAt": "2024-01-01T00:00:00.000Z",
              "createdBy": "system"
            }
          }
        ]
      },
      "metadata": {
        "name": "Hero Section Layout",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "createdBy": "system"
      }
    },
    "globalStyles": {
        "colorPaletteHash": "cp_default_001",
        "typographyScaleHash": "ts_default_001",
        "spacingSystemHash": "ss_default_001",
        "shadowStyleHash": "sh_default_001"
    }
}
```

**Curl Command**:

```bash
curl -X POST -H "Content-Type: application/json" \
-d @path/to/your/uipagespec.json \
http://localhost:3000/tools/HERO_GEN_EMIT_UI_01/call
```

**Expected Response**:

```json
{
  "filePath": "/home/ubuntu/heroui-mcp-server/workspace/MyTestPage.tsx",
  "artifactHash": "..."
}
```

