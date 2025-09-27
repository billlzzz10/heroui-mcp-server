import { toolRegistry } from './server/registry';
import { startServer } from './server/index';

const parsedPort = parseInt(process.env.PORT ?? '3030', 10);
const port = Number.isNaN(parsedPort) ? 3030 : parsedPort;

console.log('HeroUI MCP Server starting...');
console.log(`Registered tools: ${toolRegistry.getAllTools().length}`);

startServer(port)
  .then(() => {
    console.log(`HTTP server listening on port ${port}`);
  })
  .catch((error) => {
    console.error('Failed to start HeroUI MCP Server.', error);
    process.exit(1);
  });
