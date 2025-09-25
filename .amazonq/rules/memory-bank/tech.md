# HeroUI MCP Server - Technology Stack

## Programming Languages & Runtime
- **TypeScript 5.3.3**: Primary development language with strict type checking
- **Node.js**: Runtime environment (requires v18 or later)
- **Target**: ES2020 with CommonJS modules

## Core Dependencies

### Production Dependencies
- **zod ^3.22.4**: Schema validation and type inference
- **uuid ^9.0.1**: Unique identifier generation for objects and sessions

### Development Dependencies
- **jest ^29.7.0**: Testing framework
- **ts-jest ^29.1.2**: TypeScript integration for Jest
- **ts-node-dev ^2.0.0**: Development server with hot reloading
- **@types/node ^20.11.24**: Node.js type definitions
- **@types/jest ^29.5.12**: Jest type definitions
- **@types/uuid ^9.0.1**: UUID type definitions

## Build System & Configuration

### TypeScript Configuration
```json
{
  "target": "ES2020",
  "module": "commonjs",
  "rootDir": "./src",
  "outDir": "./dist",
  "strict": true,
  "esModuleInterop": true,
  "resolveJsonModule": true
}
```

### Build Process
- **Input**: `src/` directory with TypeScript files
- **Output**: `dist/` directory with compiled JavaScript
- **Entry Point**: `dist/index.js`

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Development with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run test suite
npm test
```

### Development Workflow
1. **Development**: `npm run dev` - Uses ts-node-dev for hot reloading
2. **Testing**: `npm test` - Runs Jest test suite
3. **Building**: `npm run build` - Compiles TypeScript to JavaScript
4. **Production**: `npm start` - Runs compiled JavaScript

## Testing Framework

### Jest Configuration
- **Framework**: Jest 29.7.0 with ts-jest preset
- **Test Files**: `tests/**/*.test.ts`
- **Coverage**: Available through Jest built-in coverage
- **TypeScript**: Direct TypeScript test execution via ts-jest

### Test Structure
```
tests/
└── objects/
    ├── schemas.test.ts    # Schema validation tests
    └── crud.test.ts       # CRUD operation tests
```

## File System Organization

### Source Code Structure
- **Strict TypeScript**: All source files use `.ts` extension
- **Module System**: CommonJS for Node.js compatibility
- **Import Style**: ES6 imports with esModuleInterop
- **Path Resolution**: Relative imports, no path mapping

### Data Persistence
- **Format**: JSON files for object storage
- **Location**: `data/` directory with subdirectories
- **Caching**: File-based caching in `data/cache/`
- **Templates**: Predefined templates in `data/templates/`

## Runtime Environment

### Node.js Requirements
- **Minimum Version**: Node.js 18+
- **Module System**: CommonJS
- **File System**: Full file system access for data persistence
- **Process Management**: Single-process server architecture

### Memory Management
- **Session Storage**: In-memory with periodic cleanup
- **Context Trimming**: Automatic memory optimization
- **Object Caching**: File-based caching for performance

## Development Tools

### Code Quality
- **TypeScript Strict Mode**: Enabled for maximum type safety
- **ESModule Interop**: Enabled for library compatibility
- **JSON Module Resolution**: Enabled for configuration files

### Hot Reloading
- **Tool**: ts-node-dev
- **Features**: Automatic restart on file changes
- **Transpilation**: TypeScript compilation on-the-fly
- **Performance**: Transpile-only mode for faster restarts

## Deployment Considerations

### Build Output
- **Target Directory**: `dist/`
- **Entry Point**: `dist/index.js`
- **Dependencies**: Only production dependencies required
- **Node Modules**: Standard npm package structure

### Runtime Requirements
- Node.js 18+ runtime environment
- File system write access for data persistence
- Network access for MCP server operations
- Memory allocation for session management