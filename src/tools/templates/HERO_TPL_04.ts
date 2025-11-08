// E-commerce Template
export const HERO_TPL_04 = {
  name: 'create_ecommerce_template',
  description: 'Create an e-commerce product page template with customizable colors',
  inputSchema: {
    type: 'object',
    properties: {
      layout: { type: 'string', enum: ['grid', 'list', 'masonry'], default: 'grid' },
      colorScheme: { type: 'string', enum: ['blue', 'purple', 'green', 'orange', 'dark'], default: 'blue' }
    }
  },
  execute: async (args: any) => {
    const colors = {
      blue: { primary: '#3B82F6', secondary: '#1E40AF', success: '#10B981', bg: '#F8FAFC' },
      purple: { primary: '#8B5CF6', secondary: '#7C3AED', success: '#10B981', bg: '#FAFAFA' },
      green: { primary: '#10B981', secondary: '#059669', success: '#F59E0B', bg: '#F0FDF4' },
      orange: { primary: '#F59E0B', secondary: '#D97706', success: '#10B981', bg: '#FFFBEB' },
      dark: { primary: '#374151', secondary: '#1F2937', success: '#10B981', bg: '#F9FAFB' }
    };
    
    const scheme = colors[args.colorScheme as keyof typeof colors];
    
    return {
      html: `
<div class="ecommerce" style="--primary: ${scheme.primary}; --secondary: ${scheme.secondary}; --success: ${scheme.success}; --bg: ${scheme.bg};">
  <header class="shop-header">
    <div class="logo">ShopName</div>
    <nav class="main-nav">
      <a href="#">Products</a>
      <a href="#">Categories</a>
      <a href="#">About</a>
    </nav>
    <div class="cart-icon">🛒 (0)</div>
  </header>
  <main class="shop-content">
    <div class="filters">
      <h3>Filters</h3>
      <div class="filter-group">
        <label>Category</label>
        <select><option>All</option><option>Electronics</option><option>Clothing</option></select>
      </div>
      <div class="filter-group">
        <label>Price Range</label>
        <input type="range" min="0" max="1000">
      </div>
    </div>
    <div class="products-section">
      <div class="products-header">
        <h2>Products</h2>
        <div class="sort-options">
          <select><option>Sort by Price</option><option>Sort by Name</option></select>
        </div>
      </div>
      <div class="products-grid">
        <div class="product-card">
          <img src="https://via.placeholder.com/250x250" alt="Product">
          <h3>Product Name 1</h3>
          <p class="price">$99.99</p>
          <button class="add-to-cart">Add to Cart</button>
        </div>
        <div class="product-card">
          <img src="https://via.placeholder.com/250x250" alt="Product">
          <h3>Product Name 2</h3>
          <p class="price">$149.99</p>
          <button class="add-to-cart">Add to Cart</button>
        </div>
        <div class="product-card">
          <img src="https://via.placeholder.com/250x250" alt="Product">
          <h3>Product Name 3</h3>
          <p class="price">$79.99</p>
          <button class="add-to-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  </main>
</div>`,
      css: `
.ecommerce { font-family: system-ui; background: var(--bg); min-height: 100vh; }
.shop-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.logo { font-size: 1.5rem; font-weight: bold; color: var(--primary); }
.main-nav a { margin: 0 1rem; color: var(--secondary); text-decoration: none; }
.cart-icon { color: var(--primary); font-weight: bold; }
.shop-content { display: flex; padding: 2rem; gap: 2rem; }
.filters { width: 250px; background: white; padding: 1.5rem; border-radius: 8px; height: fit-content; }
.filter-group { margin-bottom: 1rem; }
.filter-group label { display: block; margin-bottom: 0.5rem; font-weight: bold; }
.products-section { flex: 1; }
.products-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; }
.product-card { background: white; border-radius: 8px; padding: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center; }
.product-card img { width: 100%; height: 200px; object-fit: cover; border-radius: 4px; }
.price { font-size: 1.25rem; font-weight: bold; color: var(--success); }
.add-to-cart { background: var(--primary); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; width: 100%; }`
    };
  }
};