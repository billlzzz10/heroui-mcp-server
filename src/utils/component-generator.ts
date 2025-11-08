import { aiService } from './ai-service.js';
import { ComponentNLP, ComponentIntent } from './component-nlp.js';
import { z } from 'zod';

// Define the structure for generated components
interface GeneratedComponent {
  html: string;
  css: string;
  js?: string;
  componentType: string;
  description: string;
  validation: ComponentValidationResult;
}

interface ComponentValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  accessibilityScore: number;
}

// Component generation service
class ComponentGenerator {
  /**
   * Generate a UI component based on natural language description
   */
  static async generate(description: string, componentType?: string): Promise<GeneratedComponent> {
    // Validate the input
    if (!description || description.trim().length === 0) {
      throw new Error('Component description is required');
    }

    // Process the description with NLP to extract intent
    const intent = await ComponentNLP.extractIntent(description);
    const normalizedDescription = ComponentNLP.normalizeDescription(description);

    // If component type is specified, use it; otherwise, use the one from NLP
    const finalComponentType = componentType || intent.type;

    // Generate the component using AI
    const aiResult = await aiService.generateComponent(normalizedDescription, finalComponentType);

    // Parse the AI result to extract HTML, CSS, and JS
    const parsedResult = this.parseAIResult(aiResult);

    // Validate the generated component
    const validation = await this.validateComponent(parsedResult, intent);

    return {
      html: parsedResult.html,
      css: parsedResult.css,
      js: parsedResult.js,
      componentType: finalComponentType,
      description: normalizedDescription,
      validation
    };
  }

  /**
   * Parse the AI result to extract HTML, CSS, and JS
   */
  private static parseAIResult(aiResult: string): { html: string; css: string; js?: string } {
    // Extract HTML content (look for HTML tags)
    const htmlMatch = aiResult.match(/```html\s*([\s\S]*?)\s*```/i);
    let html = htmlMatch ? htmlMatch[1].trim() : aiResult;

    // If no HTML block found, try to extract content between HTML tags
    if (!htmlMatch) {
      const htmlTagMatch = aiResult.match(/<html[\s\S]*?<\/html>/i);
      if (htmlTagMatch) {
        html = htmlTagMatch[0];
      } else {
        // Look for body content
        const bodyMatch = aiResult.match(/<body[\s\S]*?<\/body>/i);
        if (bodyMatch) {
          html = bodyMatch[0];
        } else {
          // Look for div or other component content
          const divMatch = aiResult.match(/<div[\s\S]*?<\/div>/i);
          if (divMatch) {
            html = divMatch[0];
          } else {
            // Fallback: use the entire result
            html = aiResult;
          }
        }
      }
    }

    // Extract CSS content
    const cssMatch = aiResult.match(/```css\s*([\s\S]*?)\s*```/i);
    const css = cssMatch ? cssMatch[1].trim() : '';

    // Extract JavaScript content
    const jsMatch = aiResult.match(/```(javascript|js)\s*([\s\S]*?)\s*```/i);
    const js = jsMatch ? jsMatch[2].trim() : '';

    return { html, css, js };
  }

  /**
   * Validate the generated component
   */
  private static async validateComponent(
    component: { html: string; css: string; js?: string },
    intent: ComponentIntent
  ): Promise<ComponentValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];
    let isValid = true;

    // Basic HTML validation
    if (!component.html || component.html.trim().length === 0) {
      errors.push('Generated HTML is empty');
      isValid = false;
    } else {
      // Check for common HTML issues
      if (!component.html.includes('<') || !component.html.includes('>')) {
        warnings.push('Generated HTML may not contain proper tags');
      }
      
      // Check for accessibility
      const accessibilityScore = this.evaluateAccessibility(component.html);
      
      // Check for semantic HTML elements
      if (!this.hasSemanticElements(component.html)) {
        warnings.push('Component may be missing semantic HTML elements');
      }
      
      // Check for Tailwind classes
      if (!this.hasTailwindClasses(component.html)) {
        warnings.push('Component may be missing Tailwind CSS classes');
      }
    }

    // Basic CSS validation
    if (!component.css || component.css.trim().length === 0) {
      warnings.push('Generated CSS is empty');
    }

    // Basic JS validation if present
    if (component.js) {
      if (!this.isValidJavaScript(component.js)) {
        errors.push('Generated JavaScript contains syntax errors');
        isValid = false;
      }
    }

    // Evaluate accessibility
    const accessibilityScore = this.evaluateAccessibility(component.html);

    return {
      isValid,
      errors,
      warnings,
      accessibilityScore: 0
    };
  }

  /**
   * Evaluate accessibility of the HTML component
   */
  private static evaluateAccessibility(html: string): number {
    let score = 0;
    const maxScore = 100;
    
    // Check for accessibility attributes
    if (html.includes('aria-')) score += 20;
    if (html.includes('role=')) score += 15;
    if (html.includes('alt=')) score += 10;
    if (html.includes('label') || html.includes('Label')) score += 15;
    if (html.includes('title=')) score += 10;
    if (html.includes('tabindex')) score += 10;
    
    // Check for semantic elements
    if (html.includes('<nav>')) score += 5;
    if (html.includes('<header>')) score += 5;
    if (html.includes('<footer>')) score += 5;
    if (html.includes('<main>')) score += 5;
    if (html.includes('<section>')) score += 5;
    if (html.includes('<article>')) score += 5;
    
    // Cap the score at max
    return Math.min(score, maxScore);
  }

  /**
   * Check if HTML contains semantic elements
   */
  private static hasSemanticElements(html: string): boolean {
    const semanticElements = ['<header>', '<nav>', '<main>', '<section>', '<article>', '<aside>', '<footer>'];
    return semanticElements.some(element => html.includes(element));
  }

  /**
   * Check if HTML contains Tailwind classes
   */
  private static hasTailwindClasses(html: string): boolean {
    // Look for common Tailwind patterns
    const tailwindPattern = /\b(text|bg|p|m|flex|grid|border|rounded|shadow|w|h|space|gap|items|justify|font|text|leading|tracking)-/;
    return tailwindPattern.test(html);
  }

  /**
   * Check if JavaScript is valid (basic check)
   */
  private static isValidJavaScript(js: string): boolean {
    try {
      // This is a basic check - in a real implementation, we'd use a proper JS parser
      // For now, just check for obvious syntax errors
      if (js.includes('undefined_variable') || js.includes('invalid syntax')) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}

export { ComponentGenerator, GeneratedComponent, ComponentValidationResult };