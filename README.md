# HeroUI MCP Server

HeroUI Multi-Context Processing (MCP) Server for AI Design Agent.

This server provides a comprehensive suite of tools and a robust framework for an AI agent focused on UI/UX design. It includes functionalities for managing design systems, creating UI components, defining layouts, and handling various design-related objects.

## Project Structure

```
heroui-mcp-server/
├── data/                # Persistent storage for objects, cache, and templates.
│   ├── cache/           # Stores cached data for quicker access.
│   ├── objects/         # Stores JSON representations of created MCP objects.
│   └── templates/       # Stores predefined templates.
├── dist/                # Compiled TypeScript files (JavaScript output).
├── docs/                # Project documentation and specifications.
├── node_modules/        # Node.js dependencies (installed via npm).
├── src/                 # Source code of the application.
│   ├── memory/          # Session and memory management for AI context.
│   ├── objects/         # Zod schemas for MCP objects and CRUD operations.
│   ├── server/          # Server logic, tool registry, and API definitions.
│   ├── tools/           # Definitions for all AI-invocable tools, categorized.
│   └── utils/           # General utility functions.
├── tests/               # Unit and integration tests.
├── .gitignore           # Specifies intentionally untracked files to ignore.
├── jest.config.js       # Configuration for Jest testing framework.
├── package.json         # Project metadata and dependency definitions.
├── README.md            # Project overview and documentation.
└── tsconfig.json        # TypeScript compiler configuration.
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd heroui-mcp-server
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Build

Compile the TypeScript code:

```bash
npm run build
```

### Running the Server

-   **Development Mode** (with hot-reloading):
    ```bash
    npm run dev
    ```

-   **Production Mode**:
    ```bash
    npm start
    ```

### Running Tests

```bash
npm test
```

## Core Concepts

### MCP Objects

The server revolves around a set of Multi-Context Processing (MCP) objects, which represent various design entities. These objects are defined with [Zod](https://zod.dev/) schemas for robust validation and type safety, ensuring data consistency across the system. The main object types are:

-   **ColorPaletteObject**: Defines a comprehensive color system, including primary, secondary, accent colors, and their variations, along with semantic usage guidelines.
-   **TypographyScaleObject**: Specifies a typographic scale with definitions for font families, sizes, weights, line heights, and letter spacing for various text elements (e.g., headings, body text, captions).
-   **SpacingSystemObject**: Establishes a consistent spacing system using a modular scale for margins, paddings, and gaps between elements, promoting visual harmony.
-   **ShadowStyleObject**: Defines various shadow styles (e.g., elevation, depth) with properties like color, offset, blur, and spread, for consistent application across UI elements.
-   **InteractionStyleObject**: Describes styles and behaviors for interactive elements, including states like hover, focus, active, and disabled, ensuring a cohesive user experience.
-   **ComponentVariantObject**: Represents a specific variant of a UI component (e.g., a primary button, a disabled input field), encapsulating its properties, styles, and potential child components.
-   **LayoutCompositionObject**: Defines the structural arrangement and composition of UI sections or pages, specifying how components and other layouts are organized within a given area.
-   **TemplateObject**: Represents a full-page template or a complex UI pattern composed of predefined layout compositions and component variants, facilitating rapid page creation.

### Tools

The server includes a comprehensive registry of tools that the AI agent can invoke to interact with the design system. These tools are organized into categories and provide functionalities for creating, modifying, querying, and managing MCP objects. Each tool has a defined input and output schema for clear communication with the AI agent.

-   **General Tools**: For defining core design system elements like colors, typography, spacing, shadows, interactions, and basic components/layouts.
-   **Component Tools**: For managing specific UI components, their variants, and properties.
-   **Core Tools**: For interacting with the underlying system, React environment, and theme management.
-   **Hooks Tools**: For utilizing React hooks that provide reusable logic for UI behaviors and state management.
-   **Utility Tools**: For general-purpose helper functions and integrations.

### Memory Management

The `src/memory` directory contains a sophisticated session management system designed to handle the AI agent's conversational context. It includes:

-   **Session Manager**: Manages user sessions, their creation, retrieval, and lifecycle, including periodic cleanup of old sessions.
-   **Context Trimming**: Implements strategies to reduce the size of the conversational context, prioritizing recent and relevant information to stay within token limits of language models.
-   **Context Summarization**: Provides mechanisms to summarize past interactions, allowing the AI agent to maintain long-term coherence without exceeding context windows.

## API Endpoints

(To be documented once API routes are defined)

## Testing

Unit and integration tests are crucial for maintaining the quality and reliability of the HeroUI MCP Server. Tests are written using Jest and can be run with `npm test`.

## Contributing

We welcome contributions to the HeroUI MCP Server! Please refer to our `CONTRIBUTING.md` (to be created) for guidelines on how to submit issues, propose features, and contribute code.

## License

This project is licensed under the MIT License - see the `LICENSE` file (to be created) for details.


