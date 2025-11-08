// Blog Template
export const HERO_TPL_03 = {
  name: 'create_blog_template',
  description: 'Create a blog template with article layout and customizable colors',
  inputSchema: {
    type: 'object',
    properties: {
      style: { type: 'string', enum: ['magazine', 'minimal', 'card-grid', 'timeline'], default: 'magazine' },
      colorScheme: { type: 'string', enum: ['blue', 'purple', 'green', 'orange', 'dark'], default: 'blue' }
    }
  },
  execute: async (args: any) => {
    const colors = {
      blue: { primary: '#3B82F6', text: '#1F2937', accent: '#EFF6FF' },
      purple: { primary: '#8B5CF6', text: '#1F2937', accent: '#F3E8FF' },
      green: { primary: '#10B981', text: '#1F2937', accent: '#ECFDF5' },
      orange: { primary: '#F59E0B', text: '#1F2937', accent: '#FFFBEB' },
      dark: { primary: '#6B7280', text: '#F9FAFB', accent: '#374151' }
    };
    
    const scheme = colors[args.colorScheme as keyof typeof colors];
    
    return {
      html: `
<div class="blog" style="--primary: ${scheme.primary}; --text: ${scheme.text}; --accent: ${scheme.accent};">
  <header class="blog-header">
    <h1>My Blog</h1>
    <nav class="blog-nav">
      <a href="#">Home</a>
      <a href="#">Categories</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </nav>
  </header>
  <main class="blog-content">
    <article class="featured-post">
      <img src="https://via.placeholder.com/800x400" alt="Featured" class="post-image">
      <div class="post-content">
        <h2>Featured Article Title</h2>
        <p class="post-meta">Published on November 8, 2024</p>
        <p>This is the excerpt of the featured article that gives readers a preview...</p>
        <a href="#" class="read-more">Read More</a>
      </div>
    </article>
    <div class="posts-grid">
      <article class="post-card">
        <img src="https://via.placeholder.com/300x200" alt="Post">
        <h3>Article Title 1</h3>
        <p>Brief description of the article...</p>
      </article>
      <article class="post-card">
        <img src="https://via.placeholder.com/300x200" alt="Post">
        <h3>Article Title 2</h3>
        <p>Brief description of the article...</p>
      </article>
      <article class="post-card">
        <img src="https://via.placeholder.com/300x200" alt="Post">
        <h3>Article Title 3</h3>
        <p>Brief description of the article...</p>
      </article>
    </div>
  </main>
</div>`,
      css: `
.blog { font-family: system-ui; color: var(--text); max-width: 1200px; margin: 0 auto; padding: 2rem; }
.blog-header { text-align: center; margin-bottom: 3rem; }
.blog-nav { margin-top: 1rem; }
.blog-nav a { margin: 0 1rem; color: var(--primary); text-decoration: none; }
.featured-post { background: var(--accent); border-radius: 12px; overflow: hidden; margin-bottom: 3rem; }
.post-image { width: 100%; height: 300px; object-fit: cover; }
.post-content { padding: 2rem; }
.post-meta { color: #6b7280; font-size: 0.9rem; }
.read-more { color: var(--primary); font-weight: bold; text-decoration: none; }
.posts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
.post-card { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.post-card img { width: 100%; height: 200px; object-fit: cover; }
.post-card h3, .post-card p { padding: 0 1rem; }`
    };
  }
};