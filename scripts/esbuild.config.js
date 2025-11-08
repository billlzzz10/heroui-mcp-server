// esbuild configuration for HeroUI MCP Server
import { build } from 'esbuild';

const config = {
  entryPoints: ['src/server/index.ts'],
  bundle: true,
  outfile: 'dist/server/index.js',
  platform: 'node',
  target: 'node18',
  format: 'esm',
  external: [
    '@modelcontextprotocol/sdk',
    'zod',
    'fastify'
  ],
  sourcemap: true,
  minify: false,
  keepNames: true
};

// Build function
export async function buildServer() {
  try {
    await build(config);
    console.log('✅ Build completed successfully');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildServer();
}
