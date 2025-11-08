#!/usr/bin/env node

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function checkBuild() {
  const distPath = path.join(__dirname, '../dist');
  const serverPath = path.join(distPath, 'server/index.js');
  
  if (!fs.existsSync(distPath)) {
    console.log('❌ Build not found. Run: npm run build');
    return false;
  }
  
  if (!fs.existsSync(serverPath)) {
    console.log('❌ Server build not found. Run: npm run build');
    return false;
  }
  
  console.log('✅ Build exists');
  return true;
}

function checkMCPServer() {
  return new Promise((resolve) => {
    const server = spawn('node', ['dist/server/index.js'], {
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let output = '';
    
    server.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    server.stderr.on('data', (data) => {
      output += data.toString();
    });
    
    // Send MCP list tools request
    const request = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list',
      params: {}
    }) + '\n';
    
    server.stdin.write(request);
    
    setTimeout(() => {
      server.kill();
      
      try {
        const response = JSON.parse(output.split('\n')[0]);
        if (response.result && response.result.tools) {
          console.log(`✅ MCP Server OK (${response.result.tools.length} tools)`);
          resolve(true);
        } else {
          console.log('❌ Invalid MCP response');
          resolve(false);
        }
      } catch (error) {
        console.log('❌ MCP Server error:', error.message);
        resolve(false);
      }
    }, 2000);
  });
}

async function checkAll() {
  console.log('🔍 Checking HeroUI MCP Server...\n');
  
  const buildOK = checkBuild();
  if (!buildOK) return;
  
  const serverOK = await checkMCPServer();
  
  console.log('\n📊 Status:');
  console.log(`Build: ${buildOK ? '✅' : '❌'}`);
  console.log(`Server: ${serverOK ? '✅' : '❌'}`);
  
  if (buildOK && serverOK) {
    console.log('\n🚀 Server is ready!');
  } else {
    console.log('\n⚠️  Issues found. Check logs above.');
    process.exit(1);
  }
}

checkAll();
