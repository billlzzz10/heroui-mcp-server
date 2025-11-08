import { ComponentGenerator } from '../../utils/component-generator.js';

export const HERO_AI_03 = {
  name: 'generate_form',
  description: 'Generate form components using AI based on natural language descriptions',
  inputSchema: {
    type: 'object',
    properties: {
      description: {
        type: 'string',
        description: 'Natural language description of the form to generate'
      },
      fields: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Field name'
            },
            type: {
              type: 'string',
              enum: ['text', 'email', 'password', 'number', 'tel', 'url', 'select', 'checkbox', 'radio', 'textarea'],
              description: 'Field type'
            },
            label: {
              type: 'string',
              description: 'Field label'
            },
            required: {
              type: 'boolean',
              description: 'Whether field is required'
            }
          }
        },
        description: 'Form fields specification'
      },
      submitText: {
        type: 'string',
        description: 'Text for the submit button'
      }
    },
    required: ['description']
  },
  execute: async (args: any) => {
    const { description, fields = [], submitText = 'Submit' } = args;

    try {
      // Build a more specific description for form generation
      let formDescription = `A form component: ${description}`;
      
      if (fields.length > 0) {
        formDescription += ` containing the following fields: `;
        fields.forEach((field: any, index: number) => {
          if (index > 0) formDescription += ', ';
          formDescription += `${field.type} field for ${field.label || field.name}`;
          if (field.required) formDescription += ' (required)';
        });
      }
      
      formDescription += `. Include a submit button with text "${submitText}".`;

      // Generate the form component using AI
      const generatedComponent = await ComponentGenerator.generate(formDescription, 'form');

      // Format the response
      let responseText = `AI Form Generation Result:\n\n`;
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
      console.error('AI Form Generation Error:', error);
      return {
        content: [
          {
            type: 'text',
            text: `Error generating form: ${error instanceof Error ? error.message : String(error)}`
          }
        ]
      };
    }
  }
};