# HeroUI MCP Server - Development Guidelines

## Code Quality Standards

### TypeScript Configuration
- **Strict Mode**: Always enabled with comprehensive type checking
- **Target**: ES2020 with CommonJS modules for Node.js compatibility
- **Import Style**: ES6 imports with esModuleInterop enabled
- **Type Safety**: All functions and variables must have explicit or inferred types

### File Organization Patterns
- **Extension Convention**: All source files use `.ts` extension
- **Import Grouping**: External libraries first, then internal modules with relative paths
- **Export Pattern**: Named exports preferred over default exports
- **File Naming**: Descriptive names with consistent casing (camelCase for files, PascalCase for classes)

### Code Formatting Standards
- **Indentation**: 2 spaces consistently throughout codebase
- **Line Length**: Reasonable line lengths with logical breaks
- **Semicolons**: Always required at statement ends
- **Quotes**: Single quotes for strings, double quotes for object keys when needed
- **Trailing Commas**: Used in multi-line objects and arrays

## Architectural Patterns

### Schema-First Development
- **Zod Schemas**: All data structures defined with Zod for runtime validation
- **Type Inference**: TypeScript types inferred from Zod schemas using `z.infer<>`
- **Validation Strategy**: Input validation at API boundaries, safe parsing with error handling
- **Schema Composition**: Complex schemas built from simpler base schemas

```typescript
// Pattern: Schema definition with type inference
export const ColorPaletteObjectSchema = z.object({
  hash: z.string(),
  objectType: z.literal('color_palette'),
  // ... other fields
});
export type ColorPaletteObject = z.infer<typeof ColorPaletteObjectSchema>;
```

### Tool Registry Pattern
- **Naming Convention**: `HERO_[CATEGORY]_[NAME]_[VERSION]` format
- **Tool Structure**: Consistent interface with id, name, description, inputSchema, outputSchema, execute
- **Registration**: Centralized registration in registry.ts with explicit imports
- **Category Organization**: Tools grouped by functionality (general, components, hooks, utilities)

```typescript
// Pattern: Tool definition structure
export const HERO_GEN_DEFINE_COLOR_01: Tool = {
  id: "HERO_GEN_DEFINE_COLOR_01",
  name: "Define Color Palette",
  description: "Defines and stores a new color palette based on provided specifications.",
  inputSchema: inputSchema,
  outputSchema: outputSchema,
  execute: async (input: z.infer<typeof inputSchema>) => {
    // Implementation
  },
};
```

### CRUD Operations Pattern
- **In-Memory Storage**: Map-based storage for development/testing
- **Hash Generation**: Automatic hash generation for object identification
- **Validation**: Schema validation on create and update operations
- **Error Handling**: Proper error messages for validation failures
- **Type Safety**: Strongly typed CRUD operations with proper return types

### Memory Management Architecture
- **Session Management**: UUID-based session identification with automatic cleanup
- **Context Trimming**: Token-based context size management with recency prioritization
- **Metadata Tracking**: Comprehensive metadata for all objects (createdAt, createdBy, usageCount)
- **Cleanup Strategy**: Periodic cleanup of old sessions (24-hour expiry)

## Testing Patterns

### Test Structure
- **Framework**: Jest with ts-jest for TypeScript support
- **Organization**: Tests mirror source structure in `tests/` directory
- **Naming**: `*.test.ts` files with descriptive test names
- **Isolation**: `beforeEach` cleanup to ensure test isolation

### Test Coverage Patterns
- **Schema Validation**: Both positive and negative test cases for all schemas
- **CRUD Operations**: Complete CRUD lifecycle testing
- **Error Handling**: Explicit testing of error conditions and edge cases
- **Recursive Structures**: Special attention to nested/recursive schema validation

```typescript
// Pattern: Comprehensive test coverage
describe('ColorPaletteObjectSchema', () => {
  it('should validate a correct color palette object', () => {
    // Positive test case
  });
  
  it('should reject an invalid color palette object', () => {
    // Negative test case with specific error expectations
  });
});
```

## API Design Patterns

### Input/Output Schema Design
- **Descriptive Schemas**: All schema fields include `.describe()` for documentation
- **Optional Fields**: Proper use of `.optional()` for non-required fields
- **Partial Updates**: Use of `Partial<>` types for update operations
- **Schema Reuse**: Leveraging existing schemas with `.shape` and `.omit()`

### Error Handling Strategy
- **Validation Errors**: Zod validation errors with descriptive messages
- **Safe Parsing**: Use of `safeParse()` for non-throwing validation
- **Error Propagation**: Proper error bubbling with context preservation
- **Graceful Degradation**: Undefined returns for missing resources

### Async/Await Patterns
- **Consistent Usage**: All async operations use async/await syntax
- **Promise Returns**: Tool execute functions return promises
- **Error Handling**: Proper try/catch blocks where needed
- **Type Safety**: Promise types properly defined in function signatures

## Data Management Patterns

### Object Lifecycle Management
- **Hash-Based Identity**: All objects identified by generated hashes
- **Immutable Updates**: Objects updated through replacement, not mutation
- **Metadata Consistency**: Standard metadata fields across all object types
- **Version Control**: Implicit versioning through hash changes

### Recursive Data Structures
- **Lazy Evaluation**: Use of `z.lazy()` for recursive schema definitions
- **Type Safety**: Proper TypeScript handling of recursive types
- **Validation**: Deep validation of nested structures
- **Performance**: Efficient handling of complex nested objects

### Memory Optimization
- **Context Trimming**: Intelligent context size management based on token limits
- **Session Cleanup**: Automatic cleanup of expired sessions
- **Efficient Storage**: Map-based storage for O(1) lookups
- **Resource Management**: Proper cleanup and garbage collection patterns

## Integration Patterns

### External Library Integration
- **Zod**: Primary validation library with consistent usage patterns
- **UUID**: Standard UUID generation for unique identifiers
- **Jest**: Testing framework with TypeScript integration
- **Node.js**: Native Node.js APIs for file system and process management

### Module Import Patterns
- **Relative Imports**: Consistent use of relative paths for internal modules
- **Barrel Exports**: Centralized exports from index files where appropriate
- **Type-Only Imports**: Use of `import type` for type-only dependencies
- **Dependency Injection**: Registry pattern for tool management and discovery