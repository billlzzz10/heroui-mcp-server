# Quickstart Guide: AI-Powered Component Generation

## Overview
This guide will help you get started with the AI-powered component generation feature in HeroUI MCP Server. This feature allows you to generate UI components by describing them in natural language.

## Prerequisites
- HeroUI MCP Server running
- MCP-compatible client (Claude Desktop, ChatGPT, etc.)
- OpenAI API key (for AI functionality)

## Configuration
1. Set up your environment variables:
   ```bash
   # In your .env file
   OPENAI_API_KEY=your_openai_api_key_here
   ```

2. Start the HeroUI MCP Server:
   ```bash
   npm run dev
   ```

## Connecting to MCP Client

### Claude Desktop Configuration
Add the following to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "heroui": {
      "command": "node",
      "args": ["/path/to/heroui-mcp-server/dist/server/index.js"],
      "cwd": "/path/to/heroui-mcp-server"
    }
  }
}
```

### Using the AI Component Generation Tools

#### Basic Component Generation
Use the `generate_component` tool to create components from natural language descriptions:

```
/mcp call generate_component
{
  "description": "Create a large red button that says 'Submit' and turns green when clicked"
}
```

#### Generate Specific Component Types
Use the specialized tools for specific component types:

**Button Generation:**
```
/mcp call generate_button
{
  "description": "A primary button with text 'Click Me'"
}
```

**Form Generation:**
```
/mcp call generate_form
{
  "description": "A user registration form with name, email, password, and submit button"
}
```

**Layout Generation:**
```
/mcp call generate_layout
{
  "description": "A responsive layout with a header, sidebar, and main content area"
}
```

## Examples

### Example 1: Simple Button
**Input:**
```
Create a blue button that says 'Save Changes'
```

**Output:**
- HTML for a styled button
- Tailwind CSS classes
- Accessibility attributes
- Validation results

### Example 2: Complex Form
**Input:**
```
Create a login form with email, password fields and a submit button
```

**Output:**
- Complete form HTML with inputs
- Validation attributes
- Styling classes
- Security considerations

## Best Practices

1. **Be Specific**: More detailed descriptions generally produce better results
2. **Include Styling Hints**: Mention colors, sizes, or visual styles you want
3. **Specify Behavior**: Describe how components should behave when interacted with
4. **Consider Accessibility**: The system will automatically add accessibility attributes, but you can specify requirements

## Troubleshooting

### Common Issues

**AI Service Not Responding:**
- Check that your OpenAI API key is properly configured
- Verify that you have internet connectivity
- Ensure you have sufficient OpenAI API quota

**Rate Limiting:**
- The system limits requests to 10 per minute to control costs
- If you hit the limit, wait a minute before trying again

**Security Validation:**
- Descriptions containing JavaScript or potentially harmful code will be rejected
- Avoid including script tags or executable code in your descriptions

## Validation Results
Each generated component includes:
- Accessibility score (0-100)
- List of validation errors
- List of validation warnings
- Security assessment

Review these results to understand the quality of the generated component.