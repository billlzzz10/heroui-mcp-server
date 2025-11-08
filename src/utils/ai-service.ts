import OpenAI from 'openai';
import { z } from 'zod';

// Configuration interface
interface AIConfig {
  service: string;
  openaiApiKey?: string;
  openaiModel?: string;
  anthropicApiKey?: string;
  anthropicModel?: string;
  temperature?: number;
  maxTokens?: number;
}

// Initialize AI service based on configuration
class AIService {
  private openai: OpenAI | null = null;
  private config: AIConfig;
  private requestCount: number = 0;
  private lastResetTime: number = Date.now();
  private readonly maxRequestsPerMinute: number = 10; // Rate limit: 10 requests per minute

  constructor() {
    this.config = {
      service: process.env.AI_SERVICE || 'openai',
      openaiApiKey: process.env.OPENAI_API_KEY,
      openaiModel: process.env.OPENAI_MODEL || 'gpt-4o',
      anthropicApiKey: process.env.ANTHROPIC_API_KEY,
      anthropicModel: process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022',
      temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
      maxTokens: parseInt(process.env.AI_MAX_TOKENS || '2048', 10)
    };

    // Initialize OpenAI client if API key is provided
    if (this.config.openaiApiKey) {
      this.openai = new OpenAI({
        apiKey: this.config.openaiApiKey,
      });
    }
  }

  /**
   * Generate UI component based on natural language description
   */
  async generateComponent(description: string, componentType?: string): Promise<string> {
    // Check if AI generation is enabled
    if (process.env.ENABLE_AI_GENERATION === 'false') {
      throw new Error('AI generation is disabled. Enable it by setting ENABLE_AI_GENERATION=true and providing API keys.');
    }

    // Validate inputs for security
    if (!this.isValidInput(description)) {
      throw new Error('Invalid input: description contains potentially harmful content');
    }

    // Check rate limit
    if (!this.checkRateLimit()) {
      throw new Error('Rate limit exceeded: Too many requests. Please try again later.');
    }

    if (!this.openai) {
      // Return fallback template instead of error
      return this.generateFallbackComponent(description, componentType);
    }

    // Create a detailed prompt for generating UI components
    const prompt = this.buildComponentPrompt(description, componentType);

    try {
      const response = await this.openai.chat.completions.create({
        model: this.config.openaiModel || 'gpt-3.5-turbo',
        messages: [
          {
            role: "system",
            content: `You are an expert frontend developer specializing in creating clean, accessible, and responsive UI components. Generate valid HTML/CSS/JS code based on the user's description. Follow these guidelines:
            1. Use Tailwind CSS classes for styling
            2. Ensure accessibility with proper ARIA attributes
            3. Include responsive design principles
            4. Write clean, semantic HTML
            5. Include any necessary JavaScript for interactivity
            6. Do not include any malicious code or scripts`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens,
      });

      return response.choices[0].message.content || '';
    } catch (error) {
      console.error('AI generation failed, using fallback:', error);
      return this.generateFallbackComponent(description, componentType);
    }
  }

  private generateFallbackComponent(description: string, componentType?: string): string {
    // Simple template-based generation without AI
    const templates = {
      button: `<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">${description}</button>`,
      input: `<input type="text" placeholder="${description}" class="border border-gray-300 rounded px-3 py-2" />`,
      card: `<div class="bg-white shadow rounded-lg p-6"><h3 class="text-lg font-semibold">${description}</h3></div>`,
      form: `<form class="space-y-4"><h2 class="text-xl font-bold">${description}</h2><button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Submit</button></form>`
    };

    const detectedType = this.detectComponentType(description, componentType);
    return templates[detectedType as keyof typeof templates] || templates.button;
  }

  private detectComponentType(description: string, componentType?: string): string {
    if (componentType) return componentType;
    
    const desc = description.toLowerCase();
    if (desc.includes('button') || desc.includes('ปุ่ม')) return 'button';
    if (desc.includes('input') || desc.includes('ช่องกรอก')) return 'input';
    if (desc.includes('card') || desc.includes('การ์ด')) return 'card';
    if (desc.includes('form') || desc.includes('ฟอร์ม')) return 'form';
    
    return 'button';
  }

  /**
   * Check if input is valid and safe
   */
  private isValidInput(description: string): boolean {
    if (!description || typeof description !== 'string') {
      return false;
    }

    // Check for potential prompt injection or malicious content
    const dangerousPatterns = [
      /<script/i,
      /javascript:/i,
      /vbscript:/i,
      /on\w+\s*=/i,  // Event handlers like onclick, onload, etc.
      /eval\s*\(/i,
      /setTimeout\s*\(/i,
      /setInterval\s*\(/i,
      /prompt\s*\(/i,
      /alert\s*\(/i,
      /confirm\s*\(/i
    ];

    return !dangerousPatterns.some(pattern => pattern.test(description));
  }

  /**
   * Check rate limit and reset counter if needed
   */
  private checkRateLimit(): boolean {
    const now = Date.now();
    
    // Reset counter every minute
    if (now - this.lastResetTime > 60000) { // 60 seconds
      this.requestCount = 0;
      this.lastResetTime = now;
    }

    // Check if we've exceeded the limit
    if (this.requestCount >= this.maxRequestsPerMinute) {
      return false;
    }

    // Increment counter
    this.requestCount++;
    return true;
  }

  /**
   * Build a detailed prompt for component generation
   */
  private buildComponentPrompt(description: string, componentType?: string): string {
    let prompt = `Generate a UI component based on this description: "${description}"\n\n`;

    if (componentType) {
      prompt += `The component type is specifically: ${componentType}\n\n`;
    }

    prompt += `Requirements:
    1. Use Tailwind CSS classes for styling
    2. Include proper accessibility attributes (aria-label, role, etc.)
    3. Make it responsive and mobile-friendly
    4. Include any necessary JavaScript for functionality
    5. Return complete HTML, CSS, and JS code
    6. Use semantic HTML elements where appropriate
    7. Include comments explaining key parts of the implementation
    8. Do not include any malicious code, scripts, or potentially harmful content`;

    return prompt;
  }

  /**
   * Validate if the AI service is properly configured
   */
  isConfigured(): boolean {
    return !!this.config.openaiApiKey || !!this.config.anthropicApiKey;
  }

  /**
   * Get current configuration (without sensitive keys)
   */
  getPublicConfig(): Omit<AIConfig, 'openaiApiKey' | 'anthropicApiKey'> {
    const { openaiApiKey, anthropicApiKey, ...publicConfig } = this.config;
    return publicConfig;
  }
}

// Singleton instance
const aiService = new AIService();

export { aiService, AIService, AIConfig };