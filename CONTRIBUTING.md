# Contributing to HeroUI MCP Server

ขอบคุณที่สนใจมีส่วนร่วมในการพัฒนา HeroUI MCP Server! 🎉

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

โปรเจ้คนี้ยึดถือ [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md) ทุกคนที่เข้าร่วมต้องปฏิบัติตาม

## Getting Started

### วิธีการมีส่วนร่วม

1. **Report Bugs**: รายงานข้อผิดพลาดผ่าน [GitHub Issues](../../issues)
2. **Suggest Features**: เสนอฟีเจอร์ใหม่ผ่าน [GitHub Discussions](../../discussions)
3. **Fix Issues**: แก้ไขปัญหาที่มีอยู่
4. **Add Features**: เพิ่มฟีเจอร์ใหม่
5. **Improve Documentation**: ปรับปรุงเอกสาร
6. **Write Tests**: เขียน test cases

### ประเภทของ Contributions

- 🐛 **Bug fixes**
- ✨ **New features**
- 📚 **Documentation improvements**
- 🧪 **Test coverage**
- 🎨 **UI/UX improvements**
- ⚡ **Performance optimizations**
- 🔧 **Tooling improvements**

## Development Setup

### 1. Fork และ Clone

```bash
# Fork repository บน GitHub
# จากนั้น clone fork ของคุณ
git clone https://github.com/YOUR_USERNAME/heroui-mcp-server.git
cd heroui-mcp-server

# เพิ่ม upstream remote
git remote add upstream https://github.com/heroui/mcp-server.git
```

### 2. ติดตั้ง Dependencies

```bash
# ติดตั้ง Node.js dependencies
npm install

# ติดตั้ง development tools
npm install -g typescript ts-node nodemon
```

### 3. ตั้งค่า Environment

```bash
# สร้างไฟล์ environment
cp .env.example .env

# แก้ไขค่าตามต้องการ
nano .env
```

### 4. รัน Development Server

```bash
# รัน development server
npm run dev

# รัน tests
npm test

# รัน linting
npm run lint
```

## Contributing Guidelines

### Before You Start

1. **ตรวจสอบ existing issues** - อาจมีคนทำอยู่แล้ว
2. **สร้าง issue ใหม่** - หากไม่มี issue ที่เกี่ยวข้อง
3. **Discuss your approach** - คุยกับ maintainers ก่อนเริ่มงานใหญ่

### Issue Labels

- `bug` - ข้อผิดพลาดที่ต้องแก้ไข
- `enhancement` - ฟีเจอร์ใหม่หรือการปรับปรุง
- `documentation` - เกี่ยวกับเอกสาร
- `good first issue` - เหมาะสำหรับผู้เริ่มต้น
- `help wanted` - ต้องการความช่วยเหลือ
- `priority: high` - ความสำคัญสูง

### Branch Naming Convention

```bash
# Feature branches
feature/component-builder
feature/theme-editor

# Bug fix branches
fix/button-styling-issue
fix/memory-leak

# Documentation branches
docs/api-reference
docs/getting-started

# Chore branches
chore/update-dependencies
chore/improve-ci
```

## Pull Request Process

### 1. เตรียม Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# สร้าง feature branch
git checkout -b feature/your-feature-name
```

### 2. ทำการเปลี่ยนแปลง

```bash
# ทำการแก้ไข
# เขียน tests
# อัพเดท documentation

# Commit changes
git add .
git commit -m "feat: add new component builder"
```

### 3. Push และสร้าง PR

```bash
# Push to your fork
git push origin feature/your-feature-name

# สร้าง Pull Request บน GitHub
```

### 4. PR Requirements

- [ ] **Tests pass**: `npm test`
- [ ] **Linting passes**: `npm run lint`
- [ ] **Documentation updated**: หากจำเป็น
- [ ] **Changelog updated**: สำหรับ breaking changes
- [ ] **Screenshots**: สำหรับ UI changes

### 5. PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

## Coding Standards

### TypeScript Guidelines

```typescript
// ✅ Good
interface ComponentProps {
  readonly id: string;
  readonly type: ComponentType;
  readonly children?: Component[];
}

class ButtonComponent implements Component {
  constructor(private readonly props: ButtonProps) {}
  
  public render(): string {
    return this.generateHTML();
  }
  
  private generateHTML(): string {
    // Implementation
  }
}

// ❌ Bad
class button {
  constructor(public props: any) {}
  
  render() {
    return "<button>" + this.props.text + "</button>";
  }
}
```

### Naming Conventions

```typescript
// Classes: PascalCase
class ComponentFactory {}

// Interfaces: PascalCase with 'I' prefix (optional)
interface IComponent {}
interface ComponentProps {}

// Functions/Methods: camelCase
function createComponent() {}

// Constants: SCREAMING_SNAKE_CASE
const MAX_COMPONENTS = 100;

// Files: kebab-case
// component-factory.ts
// button-component.ts
```

### Code Organization

```typescript
// 1. Imports (external first, then internal)
import { FastifyInstance } from 'fastify';
import { z } from 'zod';

import { Component } from '../types';
import { validateInput } from '../utils';

// 2. Types and interfaces
interface ComponentConfig {
  // ...
}

// 3. Constants
const DEFAULT_CONFIG = {
  // ...
};

// 4. Main implementation
export class ComponentService {
  // ...
}
```

### Error Handling

```typescript
// ✅ Good - Specific error types
class ValidationError extends Error {
  constructor(
    message: string,
    public readonly field: string,
    public readonly value: unknown
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

// ✅ Good - Proper error handling
async function createComponent(props: ComponentProps): Promise<Component> {
  try {
    const validatedProps = validateProps(props);
    return new Component(validatedProps);
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ComponentCreationError(`Invalid props: ${error.message}`);
    }
    throw error;
  }
}

// ❌ Bad - Generic errors
function createComponent(props: any) {
  if (!props.type) {
    throw new Error('Bad input');
  }
}
```

## Testing

### Test Structure

```typescript
// component.test.ts
describe('Component', () => {
  describe('constructor', () => {
    it('should create component with valid props', () => {
      // Arrange
      const props = { type: 'button', text: 'Click me' };
      
      // Act
      const component = new Component(props);
      
      // Assert
      expect(component.type).toBe('button');
      expect(component.text).toBe('Click me');
    });
    
    it('should throw error with invalid props', () => {
      // Arrange
      const props = { type: null };
      
      // Act & Assert
      expect(() => new Component(props)).toThrow(ValidationError);
    });
  });
});
```

### Test Categories

1. **Unit Tests**: Test individual functions/classes
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test complete user workflows
4. **Performance Tests**: Test performance characteristics

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- component.test.ts

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Documentation

### Code Documentation

```typescript
/**
 * Creates a new UI component with the specified properties.
 * 
 * @param type - The type of component to create
 * @param props - Component properties
 * @returns A new component instance
 * 
 * @example
 * ```typescript
 * const button = createComponent('button', {
 *   text: 'Click me',
 *   variant: 'primary'
 * });
 * ```
 * 
 * @throws {ValidationError} When props are invalid
 * @throws {ComponentCreationError} When component creation fails
 */
export function createComponent(
  type: ComponentType,
  props: ComponentProps
): Component {
  // Implementation
}
```

### README Updates

เมื่อเพิ่มฟีเจอร์ใหม่ ให้อัพเดท:

1. **Features list** ใน README.md
2. **API documentation** ใน docs/
3. **Examples** ใน examples/
4. **Changelog** ใน CHANGELOG.md

### Documentation Style

- ใช้ภาษาไทยสำหรับ user-facing documentation
- ใช้ภาษาอังกฤษสำหรับ code comments และ technical docs
- ใช้ examples ที่ชัดเจนและใช้งานได้จริง
- อัพเดท API documentation เมื่อมีการเปลี่ยนแปลง

## Community

### Communication Channels

- **GitHub Issues**: Bug reports และ feature requests
- **GitHub Discussions**: General discussions และ Q&A
- **Discord**: Real-time chat และ community support
- **Twitter**: Updates และ announcements

### Getting Help

1. **Check documentation** - อ่าน docs/ folder
2. **Search existing issues** - อาจมีคำตอบแล้ว
3. **Ask in discussions** - สำหรับคำถามทั่วไป
4. **Create issue** - สำหรับ bugs หรือ feature requests

### Recognition

Contributors จะได้รับการยอมรับผ่าน:

- **Contributors list** ใน README.md
- **Release notes** เมื่อมี contribution
- **Special badges** สำหรับ significant contributions
- **Maintainer status** สำหรับ long-term contributors

## Release Process

### Version Numbering

เราใช้ [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped
- [ ] Git tag created
- [ ] NPM package published
- [ ] GitHub release created

## Questions?

หากมีคำถามเกี่ยวกับการ contribute:

1. อ่าน documentation ใน `docs/` folder
2. ค้นหาใน existing issues และ discussions
3. สร้าง issue ใหม่พร้อม label `question`
4. ติดต่อ maintainers ผ่าน Discord

ขอบคุณสำหรับการมีส่วนร่วม! 🙏
