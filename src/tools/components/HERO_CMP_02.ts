export const HERO_CMP_02 = {
  name: 'create_input',
  description: 'Create a customizable input field with validation and styling',
  inputSchema: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['text', 'email', 'password', 'number', 'tel', 'url'],
        description: 'Input type',
        default: 'text'
      },
      placeholder: {
        type: 'string',
        description: 'Placeholder text'
      },
      label: {
        type: 'string',
        description: 'Input label'
      },
      required: {
        type: 'boolean',
        description: 'Whether input is required',
        default: false
      },
      disabled: {
        type: 'boolean',
        description: 'Whether input is disabled',
        default: false
      },
      size: {
        type: 'string',
        enum: ['small', 'medium', 'large'],
        description: 'Input size',
        default: 'medium'
      }
    },
    required: []
  },
  execute: async (args: any) => {
    const { 
      type = 'text', 
      placeholder = '', 
      label = '', 
      required = false, 
      disabled = false, 
      size = 'medium' 
    } = args;
    
    const sizeClasses: Record<string, string> = {
      small: 'px-2 py-1 text-sm',
      medium: 'px-3 py-2 text-base',
      large: 'px-4 py-3 text-lg'
    };
    
    const inputHtml = `${label ? `<label class="block text-sm font-medium text-gray-700 mb-1">${label}${required ? ' *' : ''}</label>` : ''}
<input 
  type="${type}"
  ${placeholder ? `placeholder="${placeholder}"` : ''}
  ${required ? 'required' : ''}
  ${disabled ? 'disabled' : ''}
  class="w-full border border-gray-300 rounded-md ${sizeClasses[size] || sizeClasses.medium} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}"
/>`;
    
    return {
      content: [
        {
          type: 'text',
          text: `Input component created successfully!\n\nHTML:\n${inputHtml}\n\nType: ${type}\nSize: ${size}\nRequired: ${required}\nDisabled: ${disabled}`
        }
      ]
    };
  }
};
