#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const command = process.argv[2];
const toolName = process.argv[3];

const toolsDir = path.join(__dirname, '../src/tools');

function getAllTools() {
  const tools = [];
  const categories = fs.readdirSync(toolsDir);
  
  categories.forEach(category => {
    const categoryPath = path.join(toolsDir, category);
    if (fs.statSync(categoryPath).isDirectory()) {
      const files = fs.readdirSync(categoryPath);
      files.forEach(file => {
        if (file.endsWith('.ts') && !file.includes('index')) {
          const toolId = file.replace('.ts', '');
          tools.push({
            id: toolId,
            category,
            file: path.join(categoryPath, file)
          });
        }
      });
    }
  });
  
  return tools;
}

function listTools() {
  const tools = getAllTools();
  
  console.log('🛠️  HeroUI MCP Server Tools\n');
  
  const categories = {};
  tools.forEach(tool => {
    if (!categories[tool.category]) categories[tool.category] = [];
    categories[tool.category].push(tool);
  });
  
  Object.entries(categories).forEach(([category, categoryTools]) => {
    console.log(`📁 ${category.toUpperCase()}`);
    categoryTools.forEach(tool => {
      console.log(`   ${tool.id}`);
    });
    console.log();
  });
  
  console.log(`Total: ${tools.length} tools`);
}

function getTool(toolName) {
  const tools = getAllTools();
  const tool = tools.find(t => t.id === toolName);
  
  if (!tool) {
    console.error(`❌ Tool '${toolName}' not found`);
    return;
  }
  
  const content = fs.readFileSync(tool.file, 'utf8');
  
  console.log(`🔧 Tool: ${tool.id}`);
  console.log(`📁 Category: ${tool.category}`);
  console.log(`📄 File: ${tool.file}`);
  console.log('\n📝 Content:');
  console.log(content);
}

function checkTools() {
  const tools = getAllTools();
  let issues = 0;
  
  console.log('🔍 Checking tools...\n');
  
  tools.forEach(tool => {
    try {
      const content = fs.readFileSync(tool.file, 'utf8');
      
      // Basic checks
      const hasExport = content.includes('export');
      const hasName = content.includes('name:');
      const hasDescription = content.includes('description:');
      
      if (!hasExport || !hasName || !hasDescription) {
        console.log(`⚠️  ${tool.id}:`);
        if (!hasExport) console.log('   - Missing export');
        if (!hasName) console.log('   - Missing name');
        if (!hasDescription) console.log('   - Missing description');
        issues++;
      } else {
        console.log(`✅ ${tool.id}`);
      }
    } catch (error) {
      console.log(`❌ ${tool.id}: ${error.message}`);
      issues++;
    }
  });
  
  console.log(`\n📊 Summary: ${tools.length - issues}/${tools.length} tools OK`);
  if (issues > 0) {
    console.log(`⚠️  ${issues} issues found`);
    process.exit(1);
  }
}

function searchTools(query) {
  const tools = getAllTools();
  const matches = tools.filter(tool => 
    tool.id.toLowerCase().includes(query.toLowerCase()) ||
    tool.category.toLowerCase().includes(query.toLowerCase())
  );
  
  console.log(`🔍 Search results for "${query}":\n`);
  
  if (matches.length === 0) {
    console.log('No tools found');
    return;
  }
  
  matches.forEach(tool => {
    console.log(`${tool.id} (${tool.category})`);
  });
  
  console.log(`\nFound ${matches.length} tools`);
}

function showHelp() {
  console.log(`🛠️  HeroUI Tools Manager

Usage:
  npm run tools list              List all tools
  npm run tools get <TOOL_NAME>   Get tool details
  npm run tools check             Check tools integrity
  npm run tools search <QUERY>    Search tools
  npm run tools help              Show this help

Examples:
  npm run tools list
  npm run tools get HERO_CMP_01
  npm run tools check
  npm run tools search button`);
}

switch (command) {
  case 'list':
    listTools();
    break;
  case 'get':
    if (!toolName) {
      console.error('Usage: npm run tools get <TOOL_NAME>');
      process.exit(1);
    }
    getTool(toolName);
    break;
  case 'check':
    checkTools();
    break;
  case 'search':
    if (!toolName) {
      console.error('Usage: npm run tools search <QUERY>');
      process.exit(1);
    }
    searchTools(toolName);
    break;
  case 'help':
  default:
    showHelp();
}
