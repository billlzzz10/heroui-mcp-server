const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'HeroUI MCP HTTP Server',
    timestamp: new Date().toISOString()
  });
});

// MCP endpoint
app.post('/mcp', async (req, res) => {
  try {
    const mcpProcess = spawn('node', ['dist/server/index.js'], {
      cwd: __dirname,
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let output = '';
    let errorOutput = '';

    // Send request to MCP server
    mcpProcess.stdin.write(JSON.stringify(req.body));
    mcpProcess.stdin.end();

    // Collect output
    mcpProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    mcpProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    mcpProcess.on('close', (code) => {
      try {
        // Parse MCP response (skip server startup message)
        const lines = output.split('\n').filter(line => line.trim());
        const jsonLine = lines.find(line => {
          try {
            JSON.parse(line);
            return true;
          } catch {
            return false;
          }
        });

        if (jsonLine) {
          const result = JSON.parse(jsonLine);
          res.json(result);
        } else {
          throw new Error('No valid JSON response from MCP server');
        }
      } catch (error) {
        console.error('MCP Error:', error.message);
        console.error('Output:', output);
        console.error('Error Output:', errorOutput);
        
        res.status(500).json({ 
          error: error.message,
          details: {
            output: output,
            errorOutput: errorOutput,
            exitCode: code
          }
        });
      }
    });

    // Handle process errors
    mcpProcess.on('error', (error) => {
      console.error('Process Error:', error);
      res.status(500).json({ 
        error: 'Failed to start MCP server',
        details: error.message
      });
    });

  } catch (error) {
    console.error('Request Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    });
  }
});

// Tools list endpoint
app.get('/tools', async (req, res) => {
  try {
    const listRequest = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list',
      params: {}
    };

    const mcpProcess = spawn('node', ['dist/server/index.js'], {
      cwd: __dirname,
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let output = '';
    mcpProcess.stdin.write(JSON.stringify(listRequest));
    mcpProcess.stdin.end();

    mcpProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    mcpProcess.on('close', () => {
      try {
        const lines = output.split('\n').filter(line => line.trim());
        const jsonLine = lines.find(line => {
          try {
            JSON.parse(line);
            return true;
          } catch {
            return false;
          }
        });

        if (jsonLine) {
          const result = JSON.parse(jsonLine);
          res.json(result.result?.tools || []);
        } else {
          res.status(500).json({ error: 'Failed to get tools list' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Web interface
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>HeroUI MCP Web Interface</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px;
            background: #f5f5f5;
        }
        .container { 
            background: white; 
            padding: 30px; 
            border-radius: 10px; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 { color: #333; text-align: center; }
        .input-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 8px; font-weight: 600; color: #555; }
        input, textarea, select { 
            width: 100%; 
            padding: 12px; 
            border: 2px solid #ddd; 
            border-radius: 6px; 
            font-size: 14px;
            transition: border-color 0.3s;
        }
        input:focus, textarea:focus, select:focus {
            outline: none;
            border-color: #007bff;
        }
        button { 
            background: #007bff; 
            color: white; 
            border: none; 
            padding: 12px 24px; 
            border-radius: 6px; 
            cursor: pointer; 
            font-size: 16px;
            font-weight: 600;
            transition: background-color 0.3s;
        }
        button:hover { background: #0056b3; }
        button:disabled { background: #ccc; cursor: not-allowed; }
        .result { 
            margin-top: 30px; 
            padding: 20px; 
            background: #f8f9fa; 
            border: 1px solid #dee2e6; 
            border-radius: 6px;
            display: none;
        }
        .result h3 { margin-top: 0; color: #28a745; }
        pre { 
            white-space: pre-wrap; 
            word-wrap: break-word; 
            background: #2d3748;
            color: #e2e8f0;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
        }
        .loading { 
            display: none; 
            text-align: center; 
            color: #007bff;
            font-weight: 600;
        }
        .tools-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }
        .tool-card {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #dee2e6;
            cursor: pointer;
            transition: all 0.3s;
        }
        .tool-card:hover {
            background: #e9ecef;
            transform: translateY(-2px);
        }
        .tool-name { font-weight: 600; color: #007bff; margin-bottom: 5px; }
        .tool-desc { font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 HeroUI MCP Web Interface</h1>
        
        <div id="tools-container">
            <h3>Available Tools:</h3>
            <div id="tools-list" class="tools-list">
                <div class="loading">Loading tools...</div>
            </div>
        </div>

        <div class="input-group">
            <label for="tool-select">Select Tool:</label>
            <select id="tool-select">
                <option value="">Choose a tool...</option>
            </select>
        </div>

        <div class="input-group">
            <label for="prompt">Component Description:</label>
            <textarea id="prompt" rows="4" placeholder="Describe the component you want to create..."></textarea>
        </div>

        <div class="input-group">
            <label for="params">Additional Parameters (JSON):</label>
            <textarea id="params" rows="3" placeholder='{"variant": "primary", "size": "large"}'></textarea>
        </div>

        <button onclick="generateComponent()" id="generate-btn">Generate Component</button>
        
        <div class="loading" id="loading">
            <p>🔄 Generating component...</p>
        </div>

        <div id="result" class="result">
            <h3>Generated Component:</h3>
            <pre id="output"></pre>
        </div>
    </div>

    <script>
        // Load available tools
        async function loadTools() {
            try {
                const response = await fetch('/tools');
                const tools = await response.json();
                
                const toolsList = document.getElementById('tools-list');
                const toolSelect = document.getElementById('tool-select');
                
                toolsList.innerHTML = '';
                toolSelect.innerHTML = '<option value="">Choose a tool...</option>';
                
                tools.forEach(tool => {
                    // Add to grid
                    const toolCard = document.createElement('div');
                    toolCard.className = 'tool-card';
                    toolCard.onclick = () => selectTool(tool.name);
                    toolCard.innerHTML = \`
                        <div class="tool-name">\${tool.name}</div>
                        <div class="tool-desc">\${tool.description}</div>
                    \`;
                    toolsList.appendChild(toolCard);
                    
                    // Add to select
                    const option = document.createElement('option');
                    option.value = tool.name;
                    option.textContent = tool.name;
                    toolSelect.appendChild(option);
                });
            } catch (error) {
                console.error('Failed to load tools:', error);
                document.getElementById('tools-list').innerHTML = '<div style="color: red;">Failed to load tools</div>';
            }
        }

        function selectTool(toolName) {
            document.getElementById('tool-select').value = toolName;
            
            // Set example prompts based on tool
            const examples = {
                'create_button': 'Create a red delete button',
                'create_input': 'Create an email input field with validation',
                'create_grid': 'Create a 3-column product grid',
                'generate_component': 'Create a modern card component with image and text',
                'generate_form': 'Create a contact form with name, email, and message fields'
            };
            
            if (examples[toolName]) {
                document.getElementById('prompt').value = examples[toolName];
            }
        }

        async function generateComponent() {
            const toolName = document.getElementById('tool-select').value;
            const prompt = document.getElementById('prompt').value;
            const paramsText = document.getElementById('params').value;
            
            if (!toolName) {
                alert('Please select a tool');
                return;
            }
            
            if (!prompt.trim()) {
                alert('Please enter a description');
                return;
            }
            
            // Parse additional parameters
            let additionalParams = {};
            if (paramsText.trim()) {
                try {
                    additionalParams = JSON.parse(paramsText);
                } catch (error) {
                    alert('Invalid JSON in parameters field');
                    return;
                }
            }
            
            // Show loading
            document.getElementById('loading').style.display = 'block';
            document.getElementById('result').style.display = 'none';
            document.getElementById('generate-btn').disabled = true;
            
            try {
                const response = await fetch('/mcp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        jsonrpc: '2.0',
                        id: Date.now(),
                        method: 'tools/call',
                        params: {
                            name: toolName,
                            arguments: {
                                description: prompt,
                                ...additionalParams
                            }
                        }
                    })
                });
                
                const result = await response.json();
                
                if (result.error) {
                    throw new Error(result.error.message || 'Unknown error');
                }
                
                const content = result.result?.content?.[0]?.text || 'No content returned';
                document.getElementById('output').textContent = content;
                document.getElementById('result').style.display = 'block';
                
            } catch (error) {
                alert('Error: ' + error.message);
                console.error('Generation error:', error);
            } finally {
                document.getElementById('loading').style.display = 'none';
                document.getElementById('generate-btn').disabled = false;
            }
        }
        
        // Load tools on page load
        loadTools();
    </script>
</body>
</html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`🌐 HeroUI MCP HTTP Server running on port ${PORT}`);
  console.log(`📱 Web interface: http://localhost:${PORT}`);
  console.log(`🔗 MCP endpoint: http://localhost:${PORT}/mcp`);
  console.log(`🛠️ Tools list: http://localhost:${PORT}/tools`);
});

module.exports = app;
