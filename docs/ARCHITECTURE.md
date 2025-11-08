# Architecture Documentation

## Overview

HeroUI MCP Server ถูกออกแบบตามหลักการ **Model Context Protocol (MCP)** เพื่อให้สามารถสื่อสารกับ AI models และ applications ต่างๆ ได้อย่างมีประสิทธิภาพ

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Applications                       │
├─────────────────────────────────────────────────────────────┤
│  Web UI  │  CLI  │  React  │  Vue  │  Angular  │  Mobile   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway                            │
├─────────────────────────────────────────────────────────────┤
│  Authentication  │  Rate Limiting  │  Request Validation    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   HeroUI MCP Server                        │
├─────────────────────────────────────────────────────────────┤
│                    Core Services                            │
├─────────────────────────────────────────────────────────────┤
│  Component  │  Layout  │  Theme  │  Canvas  │  Template    │
│  Service    │  Service │ Service │ Service  │  Service     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Storage Layer                             │
├─────────────────────────────────────────────────────────────┤
│  Memory     │  Object     │  Cache      │  File           │
│  Manager    │  Storage    │  Storage    │  Storage        │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Server Layer (`src/server/`)

#### `index.ts` - Main Server
```typescript
class HeroUIServer {
  private fastify: FastifyInstance;
  private registry: ToolRegistry;
  private memoryManager: MemoryManager;
  
  async start(): Promise<void> {
    // Initialize server
    // Register routes
    // Start listening
  }
}
```

#### `handlers.ts` - Request Handlers
```typescript
interface RequestHandler {
  handle(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}

class ComponentHandler implements RequestHandler {
  async handle(request, reply) {
    // Handle component requests
  }
}
```

#### `registry.ts` - Tool Registry
```typescript
class ToolRegistry {
  private tools: Map<string, Tool>;
  
  register(name: string, tool: Tool): void;
  get(name: string): Tool | undefined;
  list(): Tool[];
}
```

### 2. Tools Layer (`src/tools/`)

#### Components (`src/tools/components/`)
```typescript
interface Component {
  id: string;
  type: string;
  props: ComponentProps;
  render(): string;
  getCSS(): string;
  getJS(): string;
}

class ButtonComponent implements Component {
  constructor(private props: ButtonProps) {}
  
  render(): string {
    return `<button class="${this.getClasses()}">${this.props.text}</button>`;
  }
}
```

#### Layouts (`src/tools/layout/`)
```typescript
interface Layout {
  id: string;
  type: string;
  children: Component[];
  render(): string;
}

class GridLayout implements Layout {
  constructor(private config: GridConfig) {}
  
  render(): string {
    return `<div class="hero-grid">${this.renderChildren()}</div>`;
  }
}
```

#### Themes (`src/tools/theme/`)
```typescript
interface Theme {
  colors: ColorPalette;
  typography: Typography;
  spacing: Spacing;
  apply(): void;
}

class ColorTheme implements Theme {
  constructor(private palette: ColorPalette) {}
  
  apply(): void {
    // Apply color variables to CSS
  }
}
```

### 3. Memory Management (`src/memory/`)

#### Session Manager
```typescript
class SessionManager {
  private sessions: Map<string, Session>;
  
  create(userId: string, data: any): Session;
  get(sessionId: string): Session | undefined;
  update(sessionId: string, data: any): void;
  delete(sessionId: string): void;
}
```

#### Memory Trimming
```typescript
class MemoryTrimmer {
  private maxMemoryUsage: number;
  
  trim(): void {
    // Remove old sessions
    // Clear unused cache
    // Optimize memory usage
  }
}
```

### 4. Object Storage (`src/objects/`)

#### CRUD Operations
```typescript
interface ObjectStorage {
  create(key: string, value: any): Promise<void>;
  read(key: string): Promise<any>;
  update(key: string, value: any): Promise<void>;
  delete(key: string): Promise<void>;
}

class FileStorage implements ObjectStorage {
  private basePath: string;
  
  async create(key: string, value: any): Promise<void> {
    // Save to file system
  }
}
```

## Data Flow

### 1. Request Processing Flow

```
Client Request
      │
      ▼
API Gateway
      │
      ▼
Route Handler
      │
      ▼
Service Layer
      │
      ▼
Storage Layer
      │
      ▼
Response
```

### 2. Component Creation Flow

```
Create Component Request
         │
         ▼
Validate Input
         │
         ▼
Generate Component
         │
         ▼
Apply Theme
         │
         ▼
Store in Memory
         │
         ▼
Return Component Data
```

### 3. Memory Management Flow

```
Memory Usage Check
         │
         ▼
Threshold Exceeded?
         │
    ┌────┴────┐
    │ Yes     │ No
    ▼         ▼
Trim Memory   Continue
    │
    ▼
Remove Old Data
    │
    ▼
Optimize Storage
```

## Design Patterns

### 1. Factory Pattern
```typescript
class ComponentFactory {
  static create(type: string, props: any): Component {
    switch (type) {
      case 'button':
        return new ButtonComponent(props);
      case 'input':
        return new InputComponent(props);
      default:
        throw new Error(`Unknown component type: ${type}`);
    }
  }
}
```

### 2. Observer Pattern
```typescript
class ThemeManager {
  private observers: ThemeObserver[] = [];
  
  subscribe(observer: ThemeObserver): void {
    this.observers.push(observer);
  }
  
  notify(theme: Theme): void {
    this.observers.forEach(observer => observer.update(theme));
  }
}
```

### 3. Strategy Pattern
```typescript
interface RenderStrategy {
  render(component: Component): string;
}

class HTMLRenderStrategy implements RenderStrategy {
  render(component: Component): string {
    return component.toHTML();
  }
}

class ReactRenderStrategy implements RenderStrategy {
  render(component: Component): string {
    return component.toReact();
  }
}
```

## Security Architecture

### 1. Input Validation
```typescript
class InputValidator {
  static validate(input: any, schema: Schema): ValidationResult {
    // Validate against Zod schema
    // Sanitize input
    // Check for malicious content
  }
}
```

### 2. Rate Limiting
```typescript
class RateLimiter {
  private limits: Map<string, RateLimit>;
  
  check(clientId: string): boolean {
    // Check rate limit
    // Update counters
    // Return allowed/denied
  }
}
```

### 3. Authentication (Future)
```typescript
interface AuthProvider {
  authenticate(token: string): Promise<User>;
  authorize(user: User, resource: string): boolean;
}
```

## Performance Optimizations

### 1. Caching Strategy
```typescript
class CacheManager {
  private cache: Map<string, CacheEntry>;
  
  get(key: string): any | undefined {
    const entry = this.cache.get(key);
    if (entry && !entry.isExpired()) {
      return entry.value;
    }
    return undefined;
  }
  
  set(key: string, value: any, ttl: number): void {
    this.cache.set(key, new CacheEntry(value, ttl));
  }
}
```

### 2. Lazy Loading
```typescript
class ComponentLoader {
  private loadedComponents: Map<string, Component>;
  
  async load(type: string): Promise<Component> {
    if (!this.loadedComponents.has(type)) {
      const component = await this.dynamicImport(type);
      this.loadedComponents.set(type, component);
    }
    return this.loadedComponents.get(type)!;
  }
}
```

### 3. Memory Pooling
```typescript
class ObjectPool<T> {
  private pool: T[] = [];
  private factory: () => T;
  
  acquire(): T {
    return this.pool.pop() || this.factory();
  }
  
  release(obj: T): void {
    this.reset(obj);
    this.pool.push(obj);
  }
}
```

## Scalability Considerations

### 1. Horizontal Scaling
- Load balancer distribution
- Session affinity
- Shared cache (Redis)
- Database clustering

### 2. Vertical Scaling
- Memory optimization
- CPU usage optimization
- I/O optimization
- Garbage collection tuning

### 3. Microservices Architecture (Future)
```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  Component  │  │   Layout    │  │    Theme    │
│   Service   │  │   Service   │  │   Service   │
└─────────────┘  └─────────────┘  └─────────────┘
       │                │                │
       └────────────────┼────────────────┘
                        │
              ┌─────────────┐
              │   Gateway   │
              │   Service   │
              └─────────────┘
```

## Error Handling

### 1. Error Types
```typescript
enum ErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED'
}

class HeroUIError extends Error {
  constructor(
    public type: ErrorType,
    message: string,
    public details?: any
  ) {
    super(message);
  }
}
```

### 2. Error Recovery
```typescript
class ErrorRecovery {
  static async retry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3
  ): Promise<T> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await operation();
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await this.delay(Math.pow(2, i) * 1000);
      }
    }
    throw new Error('Max retries exceeded');
  }
}
```

## Monitoring and Logging

### 1. Metrics Collection
```typescript
class MetricsCollector {
  private metrics: Map<string, Metric>;
  
  increment(name: string, value: number = 1): void;
  gauge(name: string, value: number): void;
  histogram(name: string, value: number): void;
}
```

### 2. Health Checks
```typescript
class HealthChecker {
  async check(): Promise<HealthStatus> {
    return {
      status: 'healthy',
      timestamp: new Date(),
      services: {
        database: await this.checkDatabase(),
        cache: await this.checkCache(),
        memory: await this.checkMemory()
      }
    };
  }
}
```

## Future Enhancements

### 1. Plugin System
```typescript
interface Plugin {
  name: string;
  version: string;
  install(server: HeroUIServer): void;
  uninstall(server: HeroUIServer): void;
}
```

### 2. Real-time Updates
```typescript
class WebSocketManager {
  private connections: Map<string, WebSocket>;
  
  broadcast(event: string, data: any): void {
    this.connections.forEach(ws => {
      ws.send(JSON.stringify({ event, data }));
    });
  }
}
```

### 3. AI Integration
```typescript
interface AIProvider {
  generateComponent(description: string): Promise<Component>;
  optimizeLayout(layout: Layout): Promise<Layout>;
  suggestTheme(context: any): Promise<Theme>;
}
```
