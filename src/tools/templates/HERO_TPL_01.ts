// Landing Page Template
export const HERO_TPL_01 = {
  name: 'create_landing_template',
  description: 'Create a modern landing page template with customizable colors',
  inputSchema: {
    type: 'object',
    properties: {
      theme: { type: 'string', enum: ['modern', 'minimal', 'corporate', 'creative'], default: 'modern' },
      colorScheme: { type: 'string', enum: ['blue', 'purple', 'green', 'orange', 'dark'], default: 'blue' }
    }
  },
  execute: async (args: any) => {
    const colors = {
      blue: { primary: '#3B82F6', secondary: '#1E40AF', accent: '#60A5FA' },
      purple: { primary: '#8B5CF6', secondary: '#7C3AED', accent: '#A78BFA' },
      green: { primary: '#10B981', secondary: '#059669', accent: '#34D399' },
      orange: { primary: '#F59E0B', secondary: '#D97706', accent: '#FBBF24' },
      dark: { primary: '#1F2937', secondary: '#111827', accent: '#6B7280' }
    };
    
    const scheme = colors[args.colorScheme as keyof typeof colors];
    
    return {
      html: `
<div class="landing-page" style="--primary: ${scheme.primary}; --secondary: ${scheme.secondary}; --accent: ${scheme.accent};">
  <header class="hero-section">
    <h1>Welcome to Your Site</h1>
    <p>Build amazing experiences</p>
    <button class="cta-button">Get Started</button>
  </header>
  <section class="features">
    <div class="feature-grid">
      <div class="feature-card">Feature 1</div>
      <div class="feature-card">Feature 2</div>
      <div class="feature-card">Feature 3</div>
    </div>
  </section>
</div>`,
      css: `
.landing-page { font-family: system-ui; }
.hero-section { background: var(--primary); color: white; padding: 4rem 2rem; text-align: center; }
.cta-button { background: var(--accent); border: none; padding: 1rem 2rem; border-radius: 8px; color: white; font-weight: bold; }
.features { padding: 4rem 2rem; }
.feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
.feature-card { background: white; border: 1px solid #e5e7eb; padding: 2rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }`
    };
  }
};