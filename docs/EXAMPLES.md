# Examples

ตัวอย่างการใช้งาน HeroUI MCP Server ในสถานการณ์ต่างๆ

## Table of Contents

- [Basic Usage](#basic-usage)
- [Component Examples](#component-examples)
- [Layout Examples](#layout-examples)
- [Theme Examples](#theme-examples)
- [Canvas Examples](#canvas-examples)
- [Advanced Examples](#advanced-examples)
- [Integration Examples](#integration-examples)
- [Real-world Projects](#real-world-projects)

## Basic Usage

### การเริ่มต้นใช้งาน

```typescript
import { HeroUIClient } from '@heroui/client';

// สร้าง client instance
const client = new HeroUIClient({
  baseURL: 'http://localhost:3000',
  apiKey: 'your-api-key' // optional
});

// ตรวจสอบการเชื่อมต่อ
const health = await client.health();
console.log('Server status:', health.status);
```

### การสร้าง Component แรก

```typescript
// สร้าง button component
const button = await client.components.createButton({
  text: 'Hello World',
  variant: 'primary',
  size: 'medium',
  onClick: 'alert("Button clicked!")'
});

console.log('Button HTML:', button.html);
console.log('Button CSS:', button.css);
```

## Component Examples

### 1. Button Components

```typescript
// Primary button
const primaryButton = await client.components.createButton({
  text: 'Primary Action',
  variant: 'primary',
  size: 'large',
  disabled: false
});

// Secondary button with icon
const secondaryButton = await client.components.createButton({
  text: 'Secondary Action',
  variant: 'secondary',
  size: 'medium',
  icon: 'arrow-right',
  iconPosition: 'right'
});

// Danger button
const dangerButton = await client.components.createButton({
  text: 'Delete',
  variant: 'danger',
  size: 'small',
  confirmMessage: 'Are you sure you want to delete this item?'
});
```

### 2. Form Components

```typescript
// Contact form
const contactForm = await client.components.createForm({
  fields: [
    {
      type: 'text',
      name: 'name',
      label: 'Full Name',
      required: true,
      placeholder: 'Enter your full name'
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email Address',
      required: true,
      validation: {
        pattern: '^[^@]+@[^@]+\.[^@]+$',
        message: 'Please enter a valid email address'
      }
    },
    {
      type: 'textarea',
      name: 'message',
      label: 'Message',
      required: true,
      rows: 5,
      maxLength: 500
    }
  ],
  submitButton: {
    text: 'Send Message',
    variant: 'primary'
  },
  onSubmit: 'handleContactFormSubmit'
});
```

### 3. Card Components

```typescript
// Product card
const productCard = await client.components.createCard({
  image: 'https://example.com/product.jpg',
  title: 'Premium Headphones',
  description: 'High-quality wireless headphones with noise cancellation',
  price: '$299.99',
  actions: [
    {
      text: 'Add to Cart',
      variant: 'primary',
      action: 'addToCart'
    },
    {
      text: 'View Details',
      variant: 'secondary',
      action: 'viewDetails'
    }
  ],
  badge: {
    text: 'Best Seller',
    variant: 'success'
  }
});
```

## Layout Examples

### 1. Grid Layout

```typescript
// Responsive product grid
const productGrid = await client.layout.createGrid({
  columns: 4,
  gap: '2rem',
  responsive: {
    mobile: 1,
    tablet: 2,
    desktop: 4
  },
  items: [
    { component: 'product-card-1', span: 1 },
    { component: 'product-card-2', span: 1 },
    { component: 'product-card-3', span: 1 },
    { component: 'product-card-4', span: 1 }
  ]
});
```

### 2. Dashboard Layout

```typescript
// Admin dashboard layout
const dashboardLayout = await client.layout.createDashboard({
  header: {
    height: '60px',
    component: 'dashboard-header'
  },
  sidebar: {
    width: '250px',
    component: 'dashboard-sidebar',
    collapsible: true
  },
  main: {
    component: 'dashboard-content',
    padding: '2rem'
  },
  footer: {
    height: '40px',
    component: 'dashboard-footer'
  }
});
```

### 3. Blog Layout

```typescript
// Blog post layout
const blogLayout = await client.layout.createBlog({
  header: 'blog-header',
  content: {
    main: 'blog-post-content',
    sidebar: 'blog-sidebar'
  },
  footer: 'blog-footer',
  contentWidth: '800px',
  sidebarWidth: '300px',
  gap: '3rem'
});
```

## Theme Examples

### 1. Dark Theme

```typescript
// Apply dark theme
const darkTheme = await client.theme.setColors({
  primary: '#3b82f6',
  secondary: '#64748b',
  background: '#0f172a',
  surface: '#1e293b',
  text: '#f8fafc',
  textSecondary: '#cbd5e1',
  border: '#334155',
  error: '#ef4444',
  warning: '#f59e0b',
  success: '#10b981'
});

// Apply typography
await client.theme.setTypography({
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem'
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700
  }
});
```

### 2. Brand Theme

```typescript
// Company brand theme
const brandTheme = await client.theme.createBrandTheme({
  brand: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#06b6d4'
  },
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    500: '#64748b',
    900: '#0f172a'
  },
  semantic: {
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    info: '#0284c7'
  }
});
```

## Canvas Examples

### 1. Chart Creation

```typescript
// Create bar chart
const barChart = await client.canvas.createChart({
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Sales',
      data: [12, 19, 3, 5, 2],
      backgroundColor: '#3b82f6'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Sales Report'
      }
    }
  }
});
```

### 2. Custom Graphics

```typescript
// Create custom illustration
const illustration = await client.canvas.createIllustration({
  width: 400,
  height: 300,
  elements: [
    {
      type: 'rectangle',
      x: 50,
      y: 50,
      width: 300,
      height: 200,
      fill: '#f3f4f6',
      stroke: '#d1d5db',
      strokeWidth: 2
    },
    {
      type: 'circle',
      x: 200,
      y: 150,
      radius: 50,
      fill: '#3b82f6'
    },
    {
      type: 'text',
      x: 200,
      y: 280,
      text: 'HeroUI Canvas',
      fontSize: 18,
      fontFamily: 'Arial',
      fill: '#374151',
      textAlign: 'center'
    }
  ]
});
```

## Advanced Examples

### 1. Animation System

```typescript
// Create fade-in animation
const fadeInAnimation = await client.advanced.createAnimation({
  name: 'fadeIn',
  keyframes: [
    { offset: 0, opacity: 0, transform: 'translateY(20px)' },
    { offset: 1, opacity: 1, transform: 'translateY(0)' }
  ],
  duration: 500,
  easing: 'ease-out',
  fill: 'forwards'
});

// Apply animation to component
await client.components.applyAnimation('my-component', fadeInAnimation.id);
```

### 2. State Management

```typescript
// Create global store
const appStore = await client.advanced.createStore({
  name: 'appStore',
  initialState: {
    user: null,
    theme: 'light',
    notifications: []
  },
  actions: {
    setUser: (state, user) => ({ ...state, user }),
    toggleTheme: (state) => ({
      ...state,
      theme: state.theme === 'light' ? 'dark' : 'light'
    }),
    addNotification: (state, notification) => ({
      ...state,
      notifications: [...state.notifications, notification]
    })
  }
});
```

### 3. Real-time Updates

```typescript
// Setup WebSocket connection
const websocket = await client.advanced.createWebSocket({
  url: 'ws://localhost:3000/ws',
  events: {
    'component-updated': (data) => {
      // Handle component updates
      client.components.refresh(data.componentId);
    },
    'theme-changed': (data) => {
      // Handle theme changes
      client.theme.apply(data.theme);
    }
  }
});
```

## Integration Examples

### 1. React Integration

```tsx
import React, { useEffect, useState } from 'react';
import { HeroUIClient } from '@heroui/client';

const HeroUIComponent: React.FC<{ componentId: string }> = ({ componentId }) => {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');

  useEffect(() => {
    const client = new HeroUIClient();
    
    client.components.get(componentId).then(component => {
      setHtml(component.html);
      setCss(component.css);
    });
  }, [componentId]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
};

export default HeroUIComponent;
```

### 2. Vue Integration

```vue
<template>
  <div>
    <component :is="'div'" v-html="html" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { HeroUIClient } from '@heroui/client';

const props = defineProps<{
  componentId: string;
}>();

const html = ref('');
const css = ref('');

onMounted(async () => {
  const client = new HeroUIClient();
  const component = await client.components.get(props.componentId);
  
  html.value = component.html;
  
  // Inject CSS
  const style = document.createElement('style');
  style.textContent = component.css;
  document.head.appendChild(style);
});
</script>
```

### 3. Angular Integration

```typescript
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HeroUIClient } from '@heroui/client';

@Component({
  selector: 'app-heroui-component',
  template: `<div [innerHTML]="safeHtml"></div>`
})
export class HeroUIComponent implements OnInit {
  @Input() componentId!: string;
  
  safeHtml: SafeHtml = '';

  constructor(
    private sanitizer: DomSanitizer,
    private heroUIClient: HeroUIClient
  ) {}

  async ngOnInit() {
    const component = await this.heroUIClient.components.get(this.componentId);
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(component.html);
    
    // Inject CSS
    const style = document.createElement('style');
    style.textContent = component.css;
    document.head.appendChild(style);
  }
}
```

## Real-world Projects

### 1. E-commerce Website

```typescript
// Create complete e-commerce page
async function createEcommercePage() {
  // Header with navigation
  const header = await client.components.createNavigation({
    brand: { text: 'ShopHero', logo: '/logo.png' },
    items: [
      { text: 'Home', href: '/' },
      { text: 'Products', href: '/products' },
      { text: 'About', href: '/about' },
      { text: 'Contact', href: '/contact' }
    ],
    actions: [
      { text: 'Cart (0)', href: '/cart', icon: 'shopping-cart' },
      { text: 'Login', href: '/login', variant: 'outline' }
    ]
  });

  // Hero section
  const hero = await client.components.createHero({
    title: 'Discover Amazing Products',
    subtitle: 'Shop the latest trends with confidence',
    backgroundImage: '/hero-bg.jpg',
    cta: {
      text: 'Shop Now',
      href: '/products',
      variant: 'primary',
      size: 'large'
    }
  });

  // Product grid
  const productGrid = await client.layout.createGrid({
    columns: 4,
    gap: '2rem',
    responsive: { mobile: 1, tablet: 2, desktop: 4 }
  });

  // Footer
  const footer = await client.components.createFooter({
    sections: [
      {
        title: 'Company',
        links: [
          { text: 'About Us', href: '/about' },
          { text: 'Careers', href: '/careers' },
          { text: 'Press', href: '/press' }
        ]
      },
      {
        title: 'Support',
        links: [
          { text: 'Help Center', href: '/help' },
          { text: 'Contact Us', href: '/contact' },
          { text: 'Returns', href: '/returns' }
        ]
      }
    ],
    social: [
      { platform: 'facebook', url: 'https://facebook.com/shophero' },
      { platform: 'twitter', url: 'https://twitter.com/shophero' },
      { platform: 'instagram', url: 'https://instagram.com/shophero' }
    ]
  });

  // Combine into page template
  const page = await client.templates.createPage({
    title: 'ShopHero - Your Online Store',
    components: [header.id, hero.id, productGrid.id, footer.id],
    layout: 'default',
    meta: {
      description: 'Shop amazing products at ShopHero',
      keywords: ['ecommerce', 'shopping', 'products']
    }
  });

  return page;
}
```

### 2. Dashboard Application

```typescript
// Create admin dashboard
async function createDashboard() {
  // Sidebar navigation
  const sidebar = await client.components.createSidebar({
    items: [
      { text: 'Dashboard', icon: 'dashboard', href: '/dashboard' },
      { text: 'Users', icon: 'users', href: '/users' },
      { text: 'Products', icon: 'package', href: '/products' },
      { text: 'Orders', icon: 'shopping-bag', href: '/orders' },
      { text: 'Analytics', icon: 'bar-chart', href: '/analytics' },
      { text: 'Settings', icon: 'settings', href: '/settings' }
    ],
    collapsible: true
  });

  // Stats cards
  const statsCards = await Promise.all([
    client.components.createStatsCard({
      title: 'Total Users',
      value: '12,345',
      change: '+12%',
      changeType: 'positive',
      icon: 'users'
    }),
    client.components.createStatsCard({
      title: 'Revenue',
      value: '$45,678',
      change: '+8%',
      changeType: 'positive',
      icon: 'dollar-sign'
    }),
    client.components.createStatsCard({
      title: 'Orders',
      value: '1,234',
      change: '-3%',
      changeType: 'negative',
      icon: 'shopping-bag'
    }),
    client.components.createStatsCard({
      title: 'Conversion',
      value: '3.2%',
      change: '+0.5%',
      changeType: 'positive',
      icon: 'trending-up'
    })
  ]);

  // Charts
  const salesChart = await client.canvas.createChart({
    type: 'line',
    title: 'Sales Overview',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Sales',
        data: [12000, 15000, 13000, 17000, 16000, 19000],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)'
      }]
    }
  });

  // Data table
  const usersTable = await client.components.createTable({
    columns: [
      { key: 'name', title: 'Name', sortable: true },
      { key: 'email', title: 'Email', sortable: true },
      { key: 'role', title: 'Role', sortable: false },
      { key: 'status', title: 'Status', sortable: true },
      { key: 'actions', title: 'Actions', sortable: false }
    ],
    data: [
      {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
        status: 'Active',
        actions: '<button>Edit</button><button>Delete</button>'
      }
      // ... more data
    ],
    pagination: true,
    pageSize: 10
  });

  return {
    sidebar,
    statsCards,
    salesChart,
    usersTable
  };
}
```

### 3. Blog Platform

```typescript
// Create blog platform
async function createBlogPlatform() {
  // Blog header
  const blogHeader = await client.components.createHeader({
    title: 'TechBlog',
    subtitle: 'Insights and tutorials for developers',
    navigation: [
      { text: 'Home', href: '/' },
      { text: 'Articles', href: '/articles' },
      { text: 'Categories', href: '/categories' },
      { text: 'About', href: '/about' }
    ],
    search: {
      placeholder: 'Search articles...',
      action: '/search'
    }
  });

  // Article card
  const articleCard = await client.components.createArticleCard({
    title: 'Getting Started with HeroUI MCP Server',
    excerpt: 'Learn how to build amazing UI components with HeroUI...',
    author: {
      name: 'Jane Developer',
      avatar: '/avatars/jane.jpg',
      bio: 'Senior Frontend Developer'
    },
    publishDate: '2024-11-08',
    readTime: '5 min read',
    tags: ['heroui', 'mcp', 'typescript'],
    image: '/articles/heroui-intro.jpg'
  });

  // Article content
  const articleContent = await client.components.createArticleContent({
    title: 'Getting Started with HeroUI MCP Server',
    content: `
      # Introduction
      
      HeroUI MCP Server is a powerful tool for creating UI components...
      
      ## Installation
      
      \`\`\`bash
      npm install heroui-mcp-server
      \`\`\`
      
      ## Basic Usage
      
      \`\`\`typescript
      const client = new HeroUIClient();
      const button = await client.components.createButton({
        text: 'Hello World'
      });
      \`\`\`
    `,
    toc: true,
    syntax: 'markdown'
  });

  // Comments section
  const comments = await client.components.createComments({
    articleId: 'article-123',
    allowReplies: true,
    moderation: true,
    loginRequired: false
  });

  return {
    blogHeader,
    articleCard,
    articleContent,
    comments
  };
}
```

## Performance Tips

### 1. Caching Components

```typescript
// Cache frequently used components
const cachedButton = await client.components.createButton({
  text: 'Cached Button',
  cache: {
    key: 'primary-button',
    ttl: 3600 // 1 hour
  }
});
```

### 2. Batch Operations

```typescript
// Create multiple components in batch
const components = await client.components.createBatch([
  { type: 'button', props: { text: 'Button 1' } },
  { type: 'button', props: { text: 'Button 2' } },
  { type: 'card', props: { title: 'Card 1' } }
]);
```

### 3. Lazy Loading

```typescript
// Lazy load components
const lazyComponent = await client.components.createLazy({
  type: 'heavy-component',
  placeholder: '<div>Loading...</div>',
  trigger: 'viewport' // Load when in viewport
});
```

## Troubleshooting

### Common Issues

1. **Component not rendering**
   ```typescript
   // Check if component exists
   const exists = await client.components.exists('component-id');
   if (!exists) {
     console.error('Component not found');
   }
   ```

2. **Theme not applying**
   ```typescript
   // Force theme refresh
   await client.theme.refresh();
   ```

3. **Memory issues**
   ```typescript
   // Clear cache
   await client.cache.clear();
   
   // Optimize memory
   await client.memory.optimize();
   ```

สำหรับตัวอย่างเพิ่มเติม โปรดดูที่ [examples/](../examples/) directory ในโปรเจ้ค
