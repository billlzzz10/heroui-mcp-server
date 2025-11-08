import { z } from 'zod';

export const HERO_CMP_01 = {
  name: 'create_button',
  description: 'Create a customizable button component with various styles and states',
  inputSchema: {
    type: 'object',
    properties: {
      text: {
        type: 'string',
        description: 'Button text content'
      },
      variant: {
        type: 'string',
        enum: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
        description: 'Button style variant',
        default: 'primary'
      },
      size: {
        type: 'string',
        enum: ['small', 'medium', 'large'],
        description: 'Button size',
        default: 'medium'
      },
      disabled: {
        type: 'boolean',
        description: 'Whether button is disabled',
        default: false
      },
      onClick: {
        type: 'string',
        description: 'JavaScript click handler code',
        default: ''
      }
    },
    required: ['text']
  },
  execute: async (args: any) => {
    const { text, variant = 'primary', size = 'medium', disabled = false, onClick = '' } = args;
    
    const sizeClasses: Record<string, string> = {
      small: 'px-3 py-1 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg'
    };
    
    const variantClasses: Record<string, string> = {
      primary: 'bg-blue-500 hover:bg-blue-600 text-white',
      secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
      success: 'bg-green-500 hover:bg-green-600 text-white',
      danger: 'bg-red-500 hover:bg-red-600 text-white',
      warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
      info: 'bg-cyan-500 hover:bg-cyan-600 text-white'
    };
    
    const buttonHtml = `<button 
  class="rounded font-medium transition-colors duration-200 ${sizeClasses[size] || sizeClasses.medium} ${variantClasses[variant] || variantClasses.primary} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}"
  ${disabled ? 'disabled' : ''}
  ${onClick ? `onclick="${onClick}"` : ''}
>
  ${text}
</button>`;
    
    return {
      content: [
        {
          type: 'text',
          text: `Button component created successfully!\n\nHTML:\n${buttonHtml}\n\nCSS Classes: Tailwind CSS\nVariant: ${variant}\nSize: ${size}\nDisabled: ${disabled}`
        }
      ]
    };
  }
};
