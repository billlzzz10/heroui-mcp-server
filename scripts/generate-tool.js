#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const generateTool = (category, number, name, description) => {
  const toolId = `HERO_${category.toUpperCase()}_${number.toString().padStart(2, '0')}`;
  const fileName = `${toolId}.ts`;
  const filePath = path.join(__dirname, '..', 'src', 'tools', category, fileName);

  const template = `import { z } from 'zod';

export const ${toolId} = {
  name: '${name}',
  description: '${description}',
  inputSchema: {
    type: 'object',
    properties: {
      // Add your input properties here
    },
    required: []
  },
  execute: async (args: any) => {
    try {
      // Implement your tool logic here
      return {
        content: [{
          type: 'text',
          text: 'Tool executed successfully'
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: \`Error: \${error.message}\`
        }]
      };
    }
  }
};
`;

  fs.writeFileSync(filePath, template);
  console.log(`✅ Generated: ${fileName}`);
  
  // Update index.ts
  const indexPath = path.join(__dirname, '..', 'src', 'tools', category, 'index.ts');
  const exportLine = `export { ${toolId} } from './${toolId}.js';\n`;
  fs.appendFileSync(indexPath, exportLine);
  console.log(`✅ Updated: ${category}/index.ts`);
};

// CLI usage
const [,, category, number, name, description] = process.argv;

if (!category || !number || !name) {
  console.log('Usage: node generate-tool.js <category> <number> <name> [description]');
  console.log('Example: node generate-tool.js components 03 create_card "Create card component"');
  process.exit(1);
}

generateTool(category, parseInt(number), name, description || `${name} tool`);
