# GitBook Setup Guide

## 🚀 Quick Setup

### 1. Install GitBook CLI

```bash
npm install -g gitbook-cli
```

### 2. Install Plugins

```bash
npm run gitbook:install
```

### 3. Build Documentation

```bash
npm run gitbook:build
```

### 4. Serve Locally

```bash
npm run gitbook:serve
```

เปิดเบราว์เซอร์ที่ `http://localhost:4000`

## 📚 GitBook.com Integration

### 1. Create Account

1. ไปที่ [GitBook.com](https://www.gitbook.com)
2. สร้างบัญชีใหม่หรือ login
3. สร้าง Organization ใหม่

### 2. Connect GitHub Repository

1. ใน GitBook dashboard คลิก "New Space"
2. เลือก "Import from GitHub"
3. เชื่อมต่อ GitHub repository
4. เลือก branch `main`

### 3. Configure Integration

```bash
# Set up GitBook integration
git remote add gitbook https://push.gitbook.io/[your-space-id]

# Push to GitBook
git push gitbook main
```

## 🔧 Configuration Files

### SUMMARY.md
โครงสร้างหลักของเอกสาร - GitBook จะใช้ไฟล์นี้สร้าง navigation

### .gitbook.yaml
Configuration สำหรับ GitBook integration

### book.json
Plugins และ settings สำหรับ GitBook

## 📁 File Structure

```
├── README.md              # Homepage
├── SUMMARY.md            # Table of Contents
├── .gitbook.yaml         # GitBook config
├── book.json            # GitBook settings
├── docs/
│   ├── quick-start.md
│   ├── configuration.md
│   ├── api/
│   │   ├── components.md
│   │   ├── layout.md
│   │   └── theme.md
│   └── integration/
│       ├── react.md
│       └── vue.md
└── scripts/
    └── deploy-gitbook.sh
```

## 🎨 Customization

### Themes
แก้ไขใน `book.json`:

```json
{
  "plugins": ["theme-default"],
  "pluginsConfig": {
    "theme-default": {
      "showLevel": true
    }
  }
}
```

### Custom CSS
สร้างไฟล์ `styles/website.css`:

```css
.book-summary {
  background: #f8f9fa;
}
```

## 🚀 Deployment Options

### Option 1: GitBook.com (Recommended)
- Auto-sync กับ GitHub
- Custom domain support
- Analytics built-in

### Option 2: GitHub Pages
```bash
# Build และ deploy ไป gh-pages
npm run gitbook:build
git subtree push --prefix=_book origin gh-pages
```

### Option 3: Netlify
1. Connect GitHub repository
2. Set build command: `gitbook build`
3. Set publish directory: `_book`

### Option 4: Vercel
```json
{
  "buildCommand": "gitbook build",
  "outputDirectory": "_book"
}
```

## 📝 Writing Tips

### Code Blocks
```typescript
// TypeScript code
const client = new HeroUIClient();
```

### Callouts
{% hint style="info" %}
This is an info callout
{% endhint %}

### Tabs
{% tabs %}
{% tab title="JavaScript" %}
```javascript
console.log('Hello');
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
console.log('Hello');
```
{% endtab %}
{% endtabs %}

## 🔄 Auto-Update Workflow

### GitHub Actions
สร้างไฟล์ `.github/workflows/gitbook.yml`:

```yaml
name: Deploy GitBook

on:
  push:
    branches: [ main ]
    paths: [ 'docs/**', 'README.md', 'SUMMARY.md' ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install GitBook
        run: npm install -g gitbook-cli
      - name: Install plugins
        run: gitbook install
      - name: Build book
        run: gitbook build
      - name: Deploy to GitBook
        run: ./scripts/deploy-gitbook.sh
```

## 🎯 Best Practices

1. **Keep SUMMARY.md updated** - เมื่อเพิ่มหน้าใหม่
2. **Use relative links** - สำหรับ cross-references
3. **Optimize images** - ใช้ขนาดที่เหมาะสม
4. **Test locally** - ก่อน push ไป production
5. **Use consistent formatting** - ตาม style guide

## 🆘 Troubleshooting

### Common Issues

**Plugin installation fails:**
```bash
rm -rf node_modules
npm cache clean --force
gitbook install
```

**Build fails:**
```bash
gitbook uninstall
gitbook install
gitbook build
```

**Serve not working:**
```bash
killall node
gitbook serve
```

## 📞 Support

- [GitBook Documentation](https://docs.gitbook.com)
- [GitBook Community](https://community.gitbook.com)
- [GitHub Issues](https://github.com/heroui/mcp-server/issues)
