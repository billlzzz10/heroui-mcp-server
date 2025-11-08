import { ComponentGenerator } from '../../utils/component-generator.js';

export const HERO_AI_01 = {
  name: 'generate_component',
  description: 'Generate UI components using AI based on natural language descriptions',
  inputSchema: {
    type: 'object',
    properties: {
      description: {
        type: 'string',
        description: 'Natural language description of the component to generate'
      },
      componentType: {
        type: 'string',
        description: 'Specific type of component (button, form, layout, etc.) - optional, AI will infer if not provided'
      }
    },
    required: ['description']
  },
  execute: async (args: any) => {
    const { description, componentType } = args;

    try {
      // Validate inputs
      if (!description || typeof description !== 'string' || description.trim().length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: 'Error: Component description is required and must be a non-empty string'
            }
          ]
        };
      }

      // Generate the component using AI
      const generatedComponent = await ComponentGenerator.generate(description, componentType);

      // Format the response
      let responseText = `AI Component Generation Result:\n\n`;
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
      console.error('AI Component Generation Error:', error);
      return {
        content: [
          {
            type: 'text',
            text: `Error generating component: ${error instanceof Error ? error.message : String(error)}`
          }
        ]
      };
    }
  }
};