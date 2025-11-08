import { ComponentGenerator } from '../../utils/component-generator.js';

export const HERO_AI_04 = {
  name: 'generate_layout',
  description: 'Generate layout components using AI based on natural language descriptions',
  inputSchema: {
    type: 'object',
    properties: {
      description: {
        type: 'string',
        description: 'Natural language description of the layout to generate'
      },
      type: {
        type: 'string',
        enum: ['grid', 'flex', 'header-content-footer', 'sidebar-content', 'card-grid', 'dashboard'],
        description: 'Layout type'
      },
      responsive: {
        type: 'boolean',
        description: 'Whether the layout should be responsive',
        default: true
      },
      sections: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'Named sections in the layout (e.g., header, sidebar, main, footer)'
      }
    },
    required: ['description']
  },
  execute: async (args: any) => {
    const { description, type, responsive = true, sections = [] } = args;

    try {
      // Build a more specific description for layout generation
      let layoutDescription = `A ${responsive ? 'responsive ' : ''}layout component: ${description}`;
      
      if (type) {
        layoutDescription += ` using ${type} layout system`;
      }
      
      if (sections.length > 0) {
        layoutDescription += `. The layout should include sections: ${sections.join(', ')}.`;
      } else {
        layoutDescription += '.';
      }

      // Generate the layout component using AI
      const generatedComponent = await ComponentGenerator.generate(layoutDescription, 'layout');

      // Format the response
      let responseText = `AI Layout Generation Result:\n\n`;
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
      console.error('AI Layout Generation Error:', error);
      return {
        content: [
          {
            type: 'text',
            text: `Error generating layout: ${error instanceof Error ? error.message : String(error)}`
          }
        ]
      };
    }
  }
};