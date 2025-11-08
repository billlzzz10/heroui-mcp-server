// Dashboard Template
export const HERO_TPL_02 = {
  name: 'create_dashboard_template',
  description: 'Create a dashboard template with sidebar and customizable colors',
  inputSchema: {
    type: 'object',
    properties: {
      layout: { type: 'string', enum: ['sidebar-left', 'sidebar-right', 'top-nav'], default: 'sidebar-left' },
      colorScheme: { type: 'string', enum: ['blue', 'purple', 'green', 'orange', 'dark'], default: 'blue' }
    }
  },
  execute: async (args: any) => {
    const colors = {
      blue: { primary: '#3B82F6', bg: '#F8FAFC', sidebar: '#1E293B' },
      purple: { primary: '#8B5CF6', bg: '#FAFAFA', sidebar: '#2D1B69' },
      green: { primary: '#10B981', bg: '#F0FDF4', sidebar: '#064E3B' },
      orange: { primary: '#F59E0B', bg: '#FFFBEB', sidebar: '#92400E' },
      dark: { primary: '#6B7280', bg: '#111827', sidebar: '#000000' }
    };
    
    const scheme = colors[args.colorScheme as keyof typeof colors];
    
    return {
      html: `
<div class="dashboard" style="--primary: ${scheme.primary}; --bg: ${scheme.bg}; --sidebar: ${scheme.sidebar};">
  <aside class="sidebar">
    <div class="logo">Dashboard</div>
    <nav class="nav-menu">
      <a href="#" class="nav-item active">Overview</a>
      <a href="#" class="nav-item">Analytics</a>
      <a href="#" class="nav-item">Reports</a>
      <a href="#" class="nav-item">Settings</a>
    </nav>
  </aside>
  <main class="main-content">
    <header class="top-bar">
      <h1>Dashboard Overview</h1>
    </header>
    <div class="content-grid">
      <div class="stat-card">
        <h3>Total Users</h3>
        <p class="stat-number">1,234</p>
      </div>
      <div class="stat-card">
        <h3>Revenue</h3>
        <p class="stat-number">$12,345</p>
      </div>
      <div class="stat-card">
        <h3>Orders</h3>
        <p class="stat-number">567</p>
      </div>
    </div>
  </main>
</div>`,
      css: `
.dashboard { display: flex; height: 100vh; background: var(--bg); }
.sidebar { width: 250px; background: var(--sidebar); color: white; padding: 1rem; }
.logo { font-size: 1.5rem; font-weight: bold; margin-bottom: 2rem; }
.nav-item { display: block; padding: 0.75rem 1rem; color: #cbd5e1; text-decoration: none; border-radius: 6px; margin-bottom: 0.5rem; }
.nav-item.active, .nav-item:hover { background: var(--primary); color: white; }
.main-content { flex: 1; padding: 2rem; }
.top-bar { margin-bottom: 2rem; }
.content-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
.stat-card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.stat-number { font-size: 2rem; font-weight: bold; color: var(--primary); margin: 0; }`
    };
  }
};