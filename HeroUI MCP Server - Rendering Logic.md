# HeroUI MCP Server - Rendering Logic

This document explains the mapping between the `UIPageSpec` object and the generated HeroUI JSX code. The core of this process is handled by the `emit_ui` tool, which uses a renderer utility.

## Core Utility

-   **File**: `src/utils/render-heroui.tsx`

This file contains the logic for recursively traversing a `UIPageSpec` and converting each node into a React element.

## Mapping `UIPageSpec` to JSX

The rendering process involves two main types of objects:

1.  **`LayoutCompositionObject`**: These are structural elements that define the layout (e.g., Flex, Grid). They are mapped to `<div>` elements with appropriate CSS classes or inline styles to control the layout.

2.  **`ComponentVariantObject`**: These are the actual UI components (e.g., Button, Heading). They are mapped to corresponding components in the HeroUI library.

### Component Mapping Table

The following table shows the current mapping from `targetComponent` in a `ComponentVariantObject` to a JSX element. This is a simplified representation; a full implementation would map to actual HeroUI components like `<Button>` or `<Card>`.

| `targetComponent` | Mapped JSX Element |
| :---------------- | :----------------- |
| `Heading`         | `<h1>`, `<h2>`, etc. |
| `Text`            | `<p>`              |
| `Button`          | `<button>`         |
| `Input`           | `<input>`          |
| `Card`            | `<div>`            |
| `Box`             | `<div>`            |
| `Flex`            | `<div>`            |
| `Grid`            | `<div>`            |
| `Image`           | `<img>`            |
| `Link`            | `<a>`              |

### Rendering Process

1.  The `emit_ui` tool receives a `UIPageSpec` object.
2.  It calls the `renderPage` function from `src/utils/render-heroui.tsx`.
3.  `renderPage` starts with the `root` layout object specified in the spec.
4.  It recursively calls `renderNode` for the root layout and its children.
5.  `renderNode` checks the `objectType`:
    -   If it's a `layout_composition`, it calls `renderLayout`.
    -   If it's a `component_variant`, it calls `renderComponent`.
6.  `renderLayout` creates a `<div>` and recursively renders all components/layouts within its `slots`.
7.  `renderComponent` looks up the `targetComponent` in the mapping table and creates the corresponding JSX element, passing along props and children.
8.  The final tree of React elements is converted to a string and written to a `.tsx` file in the `/workspace` directory.

This placeholder implementation generates a file containing the structure as a JSON object for inspection. A full implementation would generate a complete, runnable React component with actual JSX and style imports.

