import { ComponentGenerator } from '../../utils/component-generator.js';

export const HERO_AI_02 = {
  name: 'generate_button',
  description: 'Generate button components using AI based on natural language descriptions',
  inputSchema: {
    type: 'object',
    properties: {
      description: {
        type: 'string',
        description: 'Natural language description of the button to generate'
      },
      variant: {
        type: 'string',
        enum: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
        description: 'Button style variant'
      },
      size: {
        type: 'string',
        enum: ['small', 'medium', 'large'],
        description: 'Button size'
      },
      text: {
        type: 'string',
        description: 'Button text content'
      }
    },
    required: ['description']
  },
  execute: async (args: any) => {
    const { description, variant, size, text } = args;

    try {
      // Build a more specific description for button generation
      let buttonDescription = `A button component: ${description}`;
      
      if (variant) {
        buttonDescription += ` with ${variant} variant style`;
      }
      
      if (size) {
        buttonDescription += ` and ${size} size`;
      }
      
      if (text) {
        buttonDescription += ` that displays the text "${text}"`;
      }

      // Generate the button component using AI
      const generatedComponent = await ComponentGenerator.generate(buttonDescription, 'button');

      // Format the response
      let responseText = `AI Button Generation Result:\n\n`;
      responseText += `Component Type: ${generatedComponent.componentType}\n`;
      responseText += `Description: ${generatedComponent.description}\n\n`;
      
      responseText += `HTML:\n${generatedComponent.html}\n\n`;
      
      if (generatedComponent.css) {
        responseText += `CSS:\n${generatedComponent.css}\n\n`;
      }
      
      if (generatedComponent.js) {
        responseText += `JavaScript:\n${generatedComponent.js}\n\n`;
      }
      
      responseText += `Validation Results:\n`;
      responseText += `  Valid: ${generatedComponent.validation.isValid}\n`;
      responseText += `  Accessibility Score: ${generatedComponent.validation.accessibilityScore}/100\n`;
      
      if (generatedComponent.validation.errors.length > 0) {
        responseText += `  Errors: ${generatedComponent.validation.errors.join(', ')}\n`;
      }
      
      if (generatedComponent.validation.warnings.length > 0) {
        responseText += `  Warnings: ${generatedComponent.validation.warnings.join(', ')}\n`;
      }

      return {
        content: [
          {
            type: 'text',
            text: responseText
          }
        ]
      };
    } catch (error) {
      console.error('AI Button Generation Error:', error);
      return {
        content: [
          {
            type: 'text',
            text: `Error generating button: ${error instanceof Error ? error.message : String(error)}`
          }
        ]
      };
    }
  }
};