#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectName = process.argv[2];

if (!projectName) {
  console.error('Usage: npm run init <PROJECT_NAME>');
  process.exit(1);
}

const projectDir = path.resolve(projectName);

// Create project directory
if (fs.existsSync(projectDir)) {
  console.error(`Directory ${projectName} already exists`);
  process.exit(1);
}

fs.mkdirSync(projectDir, { recursive: true });
process.chdir(projectDir);

// Copy template files
const templateDir = path.join(__dirname, '..');
const filesToCopy = [
  'src',
  'tests',
  '.github',
  'docs',
  'scripts',
  'tsconfig.json',
  'LICENSE',
  '.gitignore',
  '.env.example'
];

filesToCopy.forEach(file => {
  const src = path.join(templateDir, file);
  const dest = path.join(projectDir, file);
  if (fs.existsSync(src)) {
    execSync(`cp -r "${src}" "${dest}"`);
  }
});

// Create package.json
const packageJson = {
  name: projectName,
  version: '1.0.0',
  type: 'module',
  description: `${projectName} - HeroUI MCP Server`,
  main: 'dist/server/index.js',
  scripts: {
    build: 'tsc',
    start: 'node dist/server/index.js',
    dev: 'tsx src/server/index.ts',
    test: 'jest',
    lint: 'eslint src/**/*.ts',
    release: 'standard-version'
  },
  dependencies: {
    '@modelcontextprotocol/sdk': '^1.18.1',
    'fastify': '^5.6.1',
    'zod': '^3.25.76',
    'typescript': '^5.9.2'
  },
  devDependencies: {
    '@types/node': '^24.5.2',
    'tsx': '^4.20.6',
    'jest': '^29.7.0',
    'eslint': '^9.12.0',
    'standard-version': '^9.5.0'
  }
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

// Create README
const readme = `# ${projectName}

HeroUI MCP Server project

## Quick Start

\`\`\`bash
npm install
npm run build
npm start
\`\`\`

## MCP Configuration

\`\`\`json
{
  "mcpServers": {
    "${projectName}": {
      "command": "node",
      "args": ["${projectDir}/dist/server/index.js"],
      "cwd": "${projectDir}"
    }
  }
}
\`\`\`
`;

fs.writeFileSync('README.md', readme);

// Create MCP config
const mcpConfig = {
  mcpServers: {
    [projectName]: {
      command: 'node',
      args: ['dist/server/index.js'],
      cwd: '.'
    }
  }
};

fs.writeFileSync('mcp-config.json', JSON.stringify(mcpConfig, null, 2));

console.log(`✅ Created ${projectName} successfully!`);
console.log(`📁 Location: ${projectDir}`);
console.log(`\n🚀 Next steps:`);
console.log(`cd ${projectName}`);
console.log(`npm install`);
console.log(`npm run build`);
console.log(`npm start`);
