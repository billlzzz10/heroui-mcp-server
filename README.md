# HeroUI MCP Server

<div align="center">
  <img src="./public/heroui-logo.jpeg" alt="HeroUI Logo" width="200" height="200" style="border-radius: 20px;">
  
  🚀 **HeroUI MCP Server** เป็น Model Context Protocol (MCP) server ที่ออกแบบมาเพื่อช่วยในการสร้างและจัดการ UI components อย่างมีประสิทธิภาพ

  [![Demo](https://img.shields.io/badge/🎮_Live_Demo-blue?style=for-the-badge)](./public/demo.html)
  [![Templates](https://img.shields.io/badge/📋_4_Templates-green?style=for-the-badge)](#เทมเพลตที่มี)
  [![Colors](https://img.shields.io/badge/🎨_5_Color_Schemes-purple?style=for-the-badge)](#ชุดสีที่มี)
</div>

## 🎬 Demo Examples

### Landing Page Template
<img src="./public/blink-ai-landing-page-example.jpg" alt="Blink AI Landing Page Example" width="600">

*ตัวอย่างหน้า Landing Page ที่สร้างด้วย `create_landing_template`*

### Dashboard Template  
<img src="./public/smithery-api-dashboard-example.png" alt="Smithery API Dashboard Example" width="600">

*ตัวอย่างหน้า Dashboard ที่สร้างด้วย `create_dashboard_template`*

## 📋 สารบัญ

- [🎯 Project Goals & Progress](./PROJECT_GOALS.md)
- [🤖 System Prompt](./SYSTEM_PROMPT.md) - **AI Assistant Guide**
- [คุณสมบัติหลัก](#คุณสมบัติหลัก)
- [การติดตั้ง](#การติดตั้ง)
- [การใช้งาน MCP](#การใช้งาน-mcp)
- [Tools Available](#tools-available)
- [การพัฒนา](#การพัฒนา)
- [📚 เอกสารเพิ่มเติม](./docs/README.md)

## ✨ คุณสมบัติหลัก

### 🎨 UI Components
- **Button Components**: สร้าง button ด้วย variants ต่างๆ
- **Input Components**: สร้าง input fields พร้อม validation
- **MindMap Components**: สร้าง interactive mindmap

### 🤖 AI-Powered Generation
- **Natural Language Component Creation**: สร้าง components จากคำอธิบายด้วยภาษาธรรมชาติ
- **Smart Component Suggestions**: แนะนำ components ตามบริบท
- **Auto-Generated Forms, Buttons, Layouts**: สร้าง component ที่ซับซ้อนได้อัตโนมัติ

### 🔧 Advanced Features
- **Markdown Parser**: แปลง Markdown เป็น Outline structure
- **MindMap Converter**: แปลง Outline เป็น MindMap
- **Layout System**: สร้าง responsive layouts

## 🚀 การติดตั้ง

### ข้อกำหนดระบบ
- Node.js >= 18.0.0
- MCP-compatible client (เช่น Claude Desktop)

### ขั้นตอนการติดตั้ง

1. **Clone repository**
```bash
git clone https://github.com/billlzzz10/heroui-mcp-server.git
cd heroui-mcp-server
```

2. **ติดตั้ง dependencies**
```bash
npm install
```

3. **Build โปรเจ้ค**
```bash
npm run build
```

## 💻 การใช้งาน MCP

### 1. เพิ่มใน MCP Client Configuration

สำหรับ Claude Desktop, เพิ่มใน `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "heroui": {
      "command": "node",
      "args": ["/path/to/heroui-mcp-server/dist/server/index.js"],
      "cwd": "/path/to/heroui-mcp-server"
    }
  }
}
```

### 2. รัน MCP Server

```bash
# Development mode
npm run dev

# Production mode
npm run build && npm start
```

### 3. ใช้งานผ่าน MCP Client

```
# สร้าง button
create_button text="Click Me" variant="primary" size="large"

# Parse markdown
parse_markdown markdown="# Project\n## Tasks\n- [ ] Setup\n- [x] Done"

# สร้าง mindmap
create_mindmap nodes='[{"id":"root","title":"Project","role":"concept"}]' layout="tree-right"
```

## 🛠️ Tools Available

### Component Tools
- `create_button` - สร้าง button component
- `create_input` - สร้าง input component  
- `create_mindmap` - สร้าง interactive mindmap

### Layout Tools
- `create_grid` - สร้าง CSS grid layout

### AI-Powered Tools
- `generate_component` - สร้าง component จากคำอธิบายด้วยภาษาธรรมชาติ
- `generate_button` - สร้าง button component ด้วย AI
- `generate_form` - สร้าง form component ด้วย AI
- `generate_layout` - สร้าง layout component ด้วย AI

### Advanced Tools
- `parse_markdown` - แปลง Markdown เป็น Outline
- `convert_to_mindmap` - แปลง Outline เป็ MindMap

## 🔧 การพัฒนา

### การเพิ่ม Tool ใหม่

1. สร้างไฟล์ใน `src/tools/[category]/`
2. เพิ่มใน `index.ts` ของ category นั้น
3. Build และทดสอบ

```typescript
// ตัวอย่าง tool ใหม่
{
  name: 'my_tool',
  description: 'My custom tool',
  inputSchema: {
    type: 'object',
    properties: {
      input: { type: 'string' }
    }
  },
  execute: async (args) => {
    return { result: 'success' };
  }
}
```

### การทดสอบ

```bash
# รัน tests
npm test

# ทดสอบ MCP server
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | node dist/server/index.js
```

## 📁 โครงสร้างโปรเจ้ค

```
heroui-mcp-server/
├── src/                          # ซอร์สโค้ดหลัก
│   ├── server/                   # เซิร์ฟเวอร์และ handlers
│   │   ├── index.ts             # เซิร์ฟเวอร์หลัก
│   │   ├── handlers.ts          # request handlers
│   │   └── registry.ts          # tool registry
│   ├── tools/                   # เครื่องมือ UI
│   │   ├── components/          # UI Components (16 files)
│   │   ├── layout/              # Layout tools (5 files)
│   │   ├── theme/               # Theme tools (4 files)
│   │   ├── canvas/              # Canvas tools (6 files)
│   │   ├── templates/           # Templates (6 files)
│   │   ├── advanced/            # Advanced tools (11 files)
│   │   └── general/             # General utilities
│   ├── memory/                  # Memory management
│   │   ├── session-manager.ts   # Session management
│   │   ├── summarization.ts     # Content summarization
│   │   └── trimming.ts          # Memory trimming
│   ├── objects/                 # Object management
│   │   ├── crud.ts              # CRUD operations
│   │   ├── schemas.ts           # Data schemas
│   │   └── storage.ts           # Storage layer
│   └── utils/                   # Utilities
│       ├── hash.ts              # Hashing functions
│       ├── responsive.ts        # Responsive utilities
│       └── validation.ts        # Validation helpers
├── data/                        # ข้อมูลและ cache
│   ├── cache/                   # Cache storage
│   ├── objects/                 # Object storage
│   └── templates/               # Template storage
├── docs/                        # เอกสารประกอบ
├── tests/                       # Test files
├── q/                          # Q CLI tools
├── package.json                # Package configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # เอกสารนี้
```

## 📚 API Documentation

### Components API

#### HERO_CMP_01 - HERO_CMP_16
เครื่องมือสำหรับสร้าง UI components ต่างๆ

- **HERO_CMP_01**: Button components
- **HERO_CMP_02**: Input components
- **HERO_CMP_03**: Card components
- **HERO_CMP_04**: Modal components
- **HERO_CMP_05**: Navigation components
- และอื่นๆ อีก 11 components

### Layout API

#### HERO_LAY_01 - HERO_LAY_05
เครื่องมือสำหรับจัดการ layout

- **HERO_LAY_01**: Grid system
- **HERO_LAY_02**: Flexbox layouts
- **HERO_LAY_03**: Container layouts
- **HERO_LAY_04**: Responsive layouts
- **HERO_LAY_05**: Custom layouts

### Theme API

#### HERO_THM_01 - HERO_THM_04
เครื่องมือสำหรับจัดการ theme

- **HERO_THM_01**: Color themes
- **HERO_THM_02**: Typography themes
- **HERO_THM_03**: Spacing themes
- **HERO_THM_04**: Custom themes

### Canvas API

#### HERO_CVS_01 - HERO_CVS_06
เครื่องมือสำหรับ canvas และการวาด

- **HERO_CVS_01**: Basic drawing
- **HERO_CVS_02**: Shape tools
- **HERO_CVS_03**: Text rendering
- **HERO_CVS_04**: Image manipulation
- **HERO_CVS_05**: Animation tools
- **HERO_CVS_06**: Export tools

## 🔧 การพัฒนา

### การตั้งค่า Development Environment

1. **Clone และติดตั้ง**
```bash
git clone <repository-url>
cd heroui-mcp-server
npm install
```

2. **รัน development server**
```bash
npm run dev
```

3. **รัน tests**
```bash
npm test
```

### การเพิ่ม Component ใหม่

1. สร้างไฟล์ใหม่ใน `src/tools/components/`
2. implement interface ที่กำหนด
3. เพิ่มใน registry
4. เขียน tests
5. อัพเดท documentation

### Code Style

- ใช้ TypeScript strict mode
- ใช้ ESLint และ Prettier
- ตั้งชื่อไฟล์ตาม convention: `HERO_[TYPE]_[NUMBER].ts`
- เขียน JSDoc สำหรับ public APIs

## 🤝 การมีส่วนร่วม

เรายินดีรับการมีส่วนร่วมจากชุมชน! 

### วิธีการมีส่วนร่วม

1. Fork repository
2. สร้าง feature branch (`git checkout -b feature/amazing-feature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add amazing feature'`)
4. Push ไปยัง branch (`git push origin feature/amazing-feature`)
5. เปิด Pull Request

### Guidelines

- เขียน commit messages ที่ชัดเจน
- เพิ่ม tests สำหรับ features ใหม่
- อัพเดท documentation
- ตรวจสอบ code style

## 📄 License

โปรเจ้คนี้ใช้ ISC License - ดูรายละเอียดใน [LICENSE](LICENSE) file

## 🙏 Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io/) สำหรับ MCP specification
- [Fastify](https://www.fastify.io/) สำหรับ web framework
- [Zod](https://zod.dev/) สำหรับ schema validation
- [TypeScript](https://www.typescriptlang.org/) สำหรับ type safety

## 📞 ติดต่อ

หากมีคำถามหรือข้อเสนอแนะ สามารถติดต่อได้ที่:

- **GitHub Issues**: [Create an issue](https://github.com/billlzzz10/heroui-mcp-server/issues)
- **Email**: billlzzz10@gmail.com
- **GitHub**: [@billlzzz10](https://github.com/billlzzz10)
- **Repository**: https://github.com/billlzzz10/heroui-mcp-server

---

**HeroUI MCP Server** - สร้าง UI ที่สวยงามและมีประสิทธิภาพด้วย MCP 🚀
