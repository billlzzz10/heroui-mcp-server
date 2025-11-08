# AI-Powered Component Generation

This document provides detailed information about the AI-powered component generation features in the HeroUI MCP Server.

## Overview

The AI-powered component generation feature allows users to create UI components using natural language descriptions. The system leverages AI models (currently OpenAI GPT-4) to interpret user requests and generate valid, accessible, and responsive UI components.

## Configuration

To use the AI-powered features, you need to configure your environment with the appropriate API keys:

```bash
# In your .env file
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o  # or another supported model
AI_TEMPERATURE=0.7    # Controls randomness (0.0-1.0)
AI_MAX_TOKENS=2048    # Maximum tokens in response
```

## Available Tools

### 1. `generate_component`

The main AI component generation tool that can create any type of UI component based on natural language description.

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "description": {
      "type": "string",
      "description": "Natural language description of the component to generate"
    },
    "componentType": {
      "type": "string",
      "description": "Specific type of component (button, form, layout, etc.) - optional"
    }
  },
  "required": ["description"]
}
```

**Example Usage:**
```
generate_component description="Create a large red button that says 'Submit' and turns green when clicked"
```

### 2. `generate_button`

A specialized tool for generating button components with additional parameters.

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "description": {
      "type": "string",
      "description": "Natural language description of the button to generate"
    },
    "variant": {
      "type": "string",
      "enum": ["primary", "secondary", "success", "danger", "warning", "info"],
      "description": "Button style variant"
    },
    "size": {
      "type": "string",
      "enum": ["small", "medium", "large"],
      "description": "Button size"
    },
    "text": {
      "type": "string",
      "description": "Button text content"
    }
  },
  "required": ["description"]
}
```

**Example Usage:**
```
generate_button description="A submit button" variant="success" size="large" text="Submit Form"
```

### 3. `generate_form`

A specialized tool for generating form components with predefined fields.

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "description": {
      "type": "string",
      "description": "Natural language description of the form to generate"
    },
    "fields": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Field name"
          },
          "type": {
            "type": "string",
            "enum": ["text", "email", "password", "number", "tel", "url", "select", "checkbox", "radio", "textarea"],
            "description": "Field type"
          },
          "label": {
            "type": "string",
            "description": "Field label"
          },
          "required": {
            "type": "boolean",
            "description": "Whether field is required"
          }
        }
      },
      "description": "Form fields specification"
    },
    "submitText": {
      "type": "string",
      "description": "Text for the submit button"
    }
  },
  "required": ["description"]
}
```

**Example Usage:**
```
generate_form description="A user registration form" fields='[{"name": "email", "type": "email", "label": "Email", "required": true}, {"name": "password", "type": "password", "label": "Password", "required": true}]' submitText="Register"
```

### 4. `generate_layout`

A specialized tool for generating layout components.

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "description": {
      "type": "string",
      "description": "Natural language description of the layout to generate"
    },
    "type": {
      "type": "string",
      "enum": ["grid", "flex", "header-content-footer", "sidebar-content", "card-grid", "dashboard"],
      "description": "Layout type"
    },
    "responsive": {
      "type": "boolean",
      "description": "Whether the layout should be responsive",
      "default": true
    },
    "sections": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Named sections in the layout (e.g., header, sidebar, main, footer)"
    }
  },
  "required": ["description"]
}
```

**Example Usage:**
```
generate_layout description="A responsive dashboard layout" type="grid" responsive=true sections='["header", "sidebar", "main", "footer"]'
```

## How It Works

1. **Natural Language Processing**: The system processes the user's description to understand the intent and identify the component type
2. **AI Generation**: The processed description is sent to the AI model with specific instructions for generating UI components
3. **Validation**: The generated component is validated for accessibility, security, and correctness
4. **Response**: The validated component is returned to the user with HTML, CSS, and JavaScript (if applicable)

## Security & Rate Limiting

- Input validation prevents malicious code injection
- Rate limiting restricts requests to 10 per minute per IP
- Generated components are scanned for potentially harmful code
- All API calls are logged for security monitoring

## Best Practices

- Use clear and specific descriptions for better results
- Include styling preferences in your description (e.g., "large red button")
- Specify accessibility requirements when needed
- Test generated components in your target environment
- Review generated code for security before deployment