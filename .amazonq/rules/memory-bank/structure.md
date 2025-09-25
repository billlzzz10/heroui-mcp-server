# HeroUI MCP Server - Project Structure

## Root Directory Organization

```
heroui-mcp-server/
├── data/                # Persistent storage layer
├── src/                 # Core application source code
├── tests/               # Test suites
├── docs/                # Project documentation
└── dist/                # Compiled TypeScript output
```

## Core Source Structure (`src/`)

### Memory Management (`src/memory/`)
- **session-manager.ts**: User session lifecycle management with periodic cleanup
- **trimming.ts**: Context size reduction strategies for token limit management
- **summarization.ts**: Long-term conversation coherence through interaction summarization

### Object System (`src/objects/`)
- **schemas.ts**: Zod schema definitions for all MCP objects (ColorPalette, Typography, Spacing, etc.)
- **crud.ts**: Create, Read, Update, Delete operations for MCP objects
- **storage.ts**: Persistent storage interface and file system operations

### Server Infrastructure (`src/server/`)
- **index.ts**: Main server entry point and initialization
- **handlers.ts**: Request/response handling and routing logic
- **registry.ts**: Tool registration and discovery system

### Tool Categories (`src/tools/`)

#### General Tools (`general/`)
Core design system elements:
- Color palette definition (HERO_GEN_DEFINE_COLOR_01)
- Typography scale setup (HERO_GEN_DEFINE_TYPO_01)
- Spacing system creation (HERO_GEN_DEFINE_SPACING_01)
- Shadow style definition (HERO_GEN_DEFINE_SHADOW_01)
- Interaction behavior setup (HERO_GEN_DEFINE_INTERACTION_01)
- Component and layout definition tools

#### Component Tools (`components/`)
60+ UI component tools organized by type:
- **Form Components**: Button, Input, Checkbox, Radio, Select, etc.
- **Navigation**: Navbar, Breadcrumbs, Pagination, Menu, Tabs
- **Data Display**: Table, Card, Badge, Avatar, Progress
- **Feedback**: Alert, Toast, Modal, Tooltip, Skeleton
- **Layout**: Divider, Spacer, Drawer, Accordion

#### React Hooks (`hooks/`)
30+ custom hooks for UI behaviors:
- **Accessibility**: ARIA hooks for buttons, modals, overlays
- **Interaction**: Draggable, clipboard, disclosure, form reset
- **Layout**: Intersection observer, resize, viewport size, measure
- **State Management**: Ref state, update effect, safe layout effect
- **Utility**: Mobile detection, SSR handling, theme management

#### Advanced Tools (`advanced/`)
Specialized functionality (HERO_ADV_01 through HERO_ADV_11)

#### Core System (`core/`)
- **HERO_CORE_REACT_01**: React environment integration
- **HERO_CORE_SYSTEM_01**: System-level operations
- **HERO_CORE_THEME_01**: Theme management and switching
- **HERO_CORE_SYSTEM_RSC_01**: React Server Components support

#### Utilities (`utilities/`)
Helper functions and integrations:
- DOM animation utilities
- ARIA utilities
- Framer Motion integration
- React utilities and test helpers
- Shared icons and components

#### Layout & Templates (`layout/`, `templates/`)
- Layout composition tools (HERO_LAY_01 through HERO_LAY_05)
- Template generation tools (HERO_TPL_01 through HERO_TPL_06)

#### Theme & Canvas (`theme/`, `canvas/`)
- Theme customization tools (HERO_THM_01 through HERO_THM_04)
- Canvas-based design operations (HERO_CVS_01 through HERO_CVS_06)

### Utility Functions (`src/utils/`)
- **hash.ts**: Data hashing and integrity functions
- **responsive.ts**: Responsive design utilities
- **validation.ts**: Input validation helpers

## Data Storage (`data/`)
- **cache/**: Temporary data storage for performance optimization
- **objects/**: JSON representations of created MCP objects
- **templates/**: Predefined design templates and patterns

## Testing Structure (`tests/`)
- **objects/schemas.test.ts**: Schema validation testing
- **objects/crud.test.ts**: CRUD operation testing

## Architectural Patterns

### Tool Naming Convention
All tools follow the pattern: `HERO_[CATEGORY]_[NAME]_[VERSION]`
- CATEGORY: GEN (General), COMP (Component), HOOK (Hook), etc.
- NAME: Descriptive identifier
- VERSION: Incremental version number (01, 02, etc.)

### Schema-First Design
- All data structures defined with Zod schemas
- Type safety enforced at runtime
- Validation occurs at API boundaries

### Modular Tool Registry
- Tools are self-contained modules
- Registry system enables dynamic tool discovery
- Category-based organization for logical grouping

### Memory-Aware Architecture
- Session management for stateful interactions
- Context trimming for token efficiency
- Summarization for long-term coherence