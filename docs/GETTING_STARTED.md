# Getting Started

## ขั้นตอนการเริ่มต้นใช้งาน HeroUI MCP Server

### 1. การติดตั้ง

#### ข้อกำหนดระบบ
- Node.js >= 18.0.0
- npm >= 8.0.0 หรือ yarn >= 1.22.0
- Git

#### ติดตั้งจาก Source
```bash
# Clone repository
git clone https://github.com/your-username/heroui-mcp-server.git
cd heroui-mcp-server

# ติดตั้ง dependencies
npm install

# Build โปรเจ้ค
npm run build

# รันเซิร์ฟเวอร์
npm start
```

#### ติดตั้งผ่าน npm (เมื่อ publish แล้ว)
```bash
npm install -g heroui-mcp-server
heroui-server start
```

### 2. การตั้งค่าเบื้องต้น

#### สร้างไฟล์ config
```bash
# สร้างไฟล์ config
cp config.example.json config.json
```

#### แก้ไข config.json
```json
{
  "server": {
    "port": 3000,
    "host": "localhost"
  },
  "database": {
    "type": "sqlite",
    "path": "./data/heroui.db"
  },
  "cache": {
    "type": "memory",
    "ttl": 3600
  },
  "logging": {
    "level": "info",
    "file": "./logs/heroui.log"
  }
}
```

### 3. การรันเซิร์ฟเวอร์

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm run build
npm start
```

#### ใช้ Docker
```bash
# Build image
docker build -t heroui-mcp-server .

# Run container
docker run -p 3000:3000 heroui-mcp-server
```

### 4. การทดสอบการติดตั้ง

#### ตรวจสอบ Health Check
```bash
curl http://localhost:3000/health
```

#### ตรวจสอบ API
```bash
curl http://localhost:3000/api/components
```

### 5. ตัวอย่างการใช้งานแรก

#### สร้าง Button Component
```typescript
import { HeroUIClient } from './src/client';

const client = new HeroUIClient('http://localhost:3000');

// สร้าง button
const button = await client.components.createButton({
  text: 'My First Button',
  variant: 'primary',
  size: 'medium'
});

console.log('Button created:', button);
```

#### สร้าง Layout
```typescript
// สร้าง grid layout
const layout = await client.layout.createGrid({
  columns: 3,
  rows: 2,
  gap: '1rem',
  responsive: {
    mobile: 1,
    tablet: 2,
    desktop: 3
  }
});

console.log('Layout created:', layout);
```

#### ใช้งาน Theme
```typescript
// ตั้งค่า color theme
const theme = await client.theme.setColors({
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8'
});

console.log('Theme applied:', theme);
```

### 6. การใช้งานผ่าน CLI

#### ติดตั้ง CLI
```bash
npm install -g @heroui/cli
```

#### คำสั่ง CLI พื้นฐาน
```bash
# สร้าง component
heroui create component button --text "Click Me" --variant primary

# สร้าง layout
heroui create layout grid --columns 3 --gap 1rem

# ตั้งค่า theme
heroui theme colors --primary "#007bff" --secondary "#6c757d"

# สร้าง page template
heroui create template page --layout grid --components button,card
```

### 7. การใช้งานผ่าน Web Interface

เปิดเบราว์เซอร์และไปที่ `http://localhost:3000/dashboard`

#### Features ใน Dashboard:
- **Component Builder**: สร้าง components แบบ visual
- **Layout Designer**: ออกแบบ layout แบบ drag & drop
- **Theme Editor**: แก้ไข theme แบบ real-time
- **Template Gallery**: เลือกใช้ template สำเร็จรูป
- **Code Generator**: สร้างโค้ดจาก design

### 8. การ Integration กับ Framework อื่น

#### React Integration
```typescript
import { useHeroUI } from '@heroui/react';

function MyComponent() {
  const { createButton, createLayout } = useHeroUI();
  
  const handleCreateButton = async () => {
    const button = await createButton({
      text: 'React Button',
      variant: 'primary'
    });
    
    // ใช้ button ใน React component
  };
  
  return (
    <div>
      <button onClick={handleCreateButton}>
        Create HeroUI Button
      </button>
    </div>
  );
}
```

#### Vue Integration
```vue
<template>
  <div>
    <button @click="createButton">Create HeroUI Button</button>
  </div>
</template>

<script>
import { useHeroUI } from '@heroui/vue';

export default {
  setup() {
    const { createButton } = useHeroUI();
    
    const handleCreateButton = async () => {
      const button = await createButton({
        text: 'Vue Button',
        variant: 'primary'
      });
    };
    
    return {
      createButton: handleCreateButton
    };
  }
};
</script>
```

#### Angular Integration
```typescript
import { Injectable } from '@angular/core';
import { HeroUIClient } from '@heroui/angular';

@Injectable({
  providedIn: 'root'
})
export class HeroUIService {
  private client = new HeroUIClient('http://localhost:3000');
  
  async createButton(options: any) {
    return await this.client.components.createButton(options);
  }
}
```

### 9. การใช้งาน Advanced Features

#### Animation
```typescript
// สร้าง animation
const animation = await client.advanced.createAnimation({
  target: '.my-button',
  keyframes: [
    { offset: 0, transform: 'scale(1)' },
    { offset: 0.5, transform: 'scale(1.1)' },
    { offset: 1, transform: 'scale(1)' }
  ],
  duration: 300,
  easing: 'ease-in-out'
});
```

#### State Management
```typescript
// สร้าง store
const store = await client.advanced.createStore({
  initialState: {
    theme: 'light',
    components: []
  },
  reducers: {
    setTheme: (state, action) => ({
      ...state,
      theme: action.payload
    }),
    addComponent: (state, action) => ({
      ...state,
      components: [...state.components, action.payload]
    })
  }
});
```

### 10. การ Debug และ Troubleshooting

#### เปิด Debug Mode
```bash
DEBUG=heroui:* npm start
```

#### ตรวจสอบ Logs
```bash
tail -f logs/heroui.log
```

#### Common Issues

**Port already in use**
```bash
# หา process ที่ใช้ port 3000
lsof -i :3000

# kill process
kill -9 <PID>
```

**Database connection error**
```bash
# ตรวจสอบ database file
ls -la data/heroui.db

# สร้าง database ใหม่
npm run db:reset
```

**Memory issues**
```bash
# เพิ่ม memory limit
node --max-old-space-size=4096 dist/server/index.js
```

### 11. การ Deploy

#### Deploy บน Heroku
```bash
# สร้าง Heroku app
heroku create heroui-app

# ตั้งค่า environment variables
heroku config:set NODE_ENV=production
heroku config:set PORT=3000

# Deploy
git push heroku main
```

#### Deploy บน AWS
```bash
# ใช้ AWS CLI
aws configure

# สร้าง EC2 instance
aws ec2 run-instances --image-id ami-12345678 --instance-type t2.micro

# Deploy ด้วย CodeDeploy
aws deploy create-deployment --application-name heroui-app
```

#### Deploy ด้วย Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### 12. Next Steps

1. **อ่าน API Documentation**: [API_REFERENCE.md](./API_REFERENCE.md)
2. **ดู Examples**: [examples/](../examples/)
3. **เข้าร่วม Community**: [Discord](https://discord.gg/heroui)
4. **Contribute**: [CONTRIBUTING.md](../CONTRIBUTING.md)

### 13. Resources

- **Documentation**: https://docs.heroui.dev
- **Examples**: https://examples.heroui.dev
- **Playground**: https://playground.heroui.dev
- **GitHub**: https://github.com/heroui/mcp-server
- **Discord**: https://discord.gg/heroui
- **Twitter**: https://twitter.com/heroui_dev
