import { z } from 'zod';

// HeroUI MCP Server Configuration Schema
export const configSchema = z.object({
  // AI Services Configuration
  aiService: z.enum(['openai', 'anthropic', 'disabled'])
    .default('disabled')
    .describe('AI service provider for component generation'),
  
  openaiApiKey: z.string()
    .optional()
    .describe('OpenAI API key for AI-powered component generation'),
  
  openaiModel: z.string()
    .default('gpt-3.5-turbo')
    .describe('OpenAI model to use (gpt-3.5-turbo, gpt-4, etc.)'),
  
  anthropicApiKey: z.string()
    .optional()
    .describe('Anthropic API key for Claude-powered generation'),
  
  anthropicModel: z.string()
    .default('claude-3-haiku-20240307')
    .describe('Anthropic model to use'),

  // Component Generation Settings
  defaultVariant: z.enum(['primary', 'secondary', 'success', 'danger', 'warning', 'info'])
    .default('primary')
    .describe('Default button variant for generated components'),
  
  defaultSize: z.enum(['small', 'medium', 'large'])
    .default('medium')
    .describe('Default size for generated components'),
  
  cssFramework: z.enum(['tailwind', 'bootstrap', 'custom'])
    .default('tailwind')
    .describe('CSS framework to use for styling'),

  // Theme Configuration
  theme: z.enum(['light', 'dark', 'auto'])
    .default('light')
    .describe('UI theme preference'),
  
  primaryColor: z.string()
    .default('#007bff')
    .describe('Primary color for components (hex code)'),
  
  borderRadius: z.number()
    .min(0)
    .max(20)
    .default(6)
    .describe('Default border radius in pixels'),

  // Behavior Settings
  enableResponsive: z.boolean()
    .default(true)
    .describe('Enable responsive design by default'),
  
  enableAccessibility: z.boolean()
    .default(true)
    .describe('Include accessibility attributes (ARIA, etc.)'),
  
  enableAnimations: z.boolean()
    .default(true)
    .describe('Include CSS transitions and animations'),

  // Session Settings
  sessionTimeout: z.number()
    .min(300)
    .max(86400)
    .default(3600)
    .describe('Session timeout in seconds'),
  
  maxComponentsPerSession: z.number()
    .min(10)
    .max(1000)
    .default(100)
    .describe('Maximum components per session'),

  // Learning System
  enableLearning: z.boolean()
    .default(true)
    .describe('Enable learning system to improve suggestions'),
  
  enableFeedback: z.boolean()
    .default(true)
    .describe('Enable feedback collection for improvement'),

  // Advanced Settings
  temperature: z.number()
    .min(0)
    .max(2)
    .default(0.7)
    .describe('AI creativity level (0=conservative, 2=creative)'),
  
  maxTokens: z.number()
    .min(100)
    .max(4000)
    .default(2000)
    .describe('Maximum tokens for AI responses'),
  
  enableDebug: z.boolean()
    .default(false)
    .describe('Enable debug logging'),

  // Output Preferences
  includeComments: z.boolean()
    .default(true)
    .describe('Include helpful comments in generated code'),
  
  minifyOutput: z.boolean()
    .default(false)
    .describe('Minify generated CSS/HTML output'),
  
  outputFormat: z.enum(['html', 'jsx', 'vue', 'svelte'])
    .default('html')
    .describe('Preferred output format for components')
});

export type HeroUIConfig = z.infer<typeof configSchema>;
