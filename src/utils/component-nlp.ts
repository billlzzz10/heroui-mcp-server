import { z } from 'zod';

// Define types for component descriptions
interface ComponentIntent {
  type: string; // 'button', 'form', 'layout', etc.
  properties: Record<string, any>;
  styling: Record<string, any>;
  behavior: Record<string, any>;
}

// Define a schema for component descriptions
const ComponentDescriptionSchema = z.object({
  description: z.string().min(1, "Description is required"),
  componentType: z.string().optional(),
  stylingPreferences: z.record(z.string(), z.any()).optional(),
  accessibilityRequirements: z.array(z.string()).optional(),
});

// Natural Language Processing utility for UI components
class ComponentNLP {
  /**
   * Extract component intent from natural language description
   */
  static async extractIntent(description: string): Promise<ComponentIntent> {
    // Basic NLP processing to identify component type and properties
    const lowerDesc = description.toLowerCase();
    
    // Identify component type based on keywords
    let componentType = 'generic';
    if (lowerDesc.includes('button')) {
      componentType = 'button';
    } else if (lowerDesc.includes('form') || lowerDesc.includes('input') || lowerDesc.includes('field')) {
      componentType = 'form';
    } else if (lowerDesc.includes('layout') || lowerDesc.includes('container') || lowerDesc.includes('grid') || lowerDesc.includes('flex')) {
      componentType = 'layout';
    } else if (lowerDesc.includes('card')) {
      componentType = 'card';
    } else if (lowerDesc.includes('navigation') || lowerDesc.includes('nav')) {
      componentType = 'navigation';
    } else if (lowerDesc.includes('modal')) {
      componentType = 'modal';
    } else if (lowerDesc.includes('table')) {
      componentType = 'table';
    } else if (lowerDesc.includes('list') || lowerDesc.includes('menu')) {
      componentType = 'list';
    }
    
    // Extract properties based on keywords
    const properties: Record<string, any> = {};
    
    // Button-specific properties
    if (componentType === 'button') {
      if (lowerDesc.includes('large') || lowerDesc.includes('big')) properties.size = 'large';
      else if (lowerDesc.includes('small') || lowerDesc.includes('tiny')) properties.size = 'small';
      else properties.size = 'medium';
      
      if (lowerDesc.includes('primary')) properties.variant = 'primary';
      else if (lowerDesc.includes('secondary')) properties.variant = 'secondary';
      else if (lowerDesc.includes('success') || lowerDesc.includes('green')) properties.variant = 'success';
      else if (lowerDesc.includes('danger') || lowerDesc.includes('red')) properties.variant = 'danger';
      else if (lowerDesc.includes('warning') || lowerDesc.includes('yellow')) properties.variant = 'warning';
      else if (lowerDesc.includes('info') || lowerDesc.includes('blue')) properties.variant = 'info';
      else properties.variant = 'primary';
      
      // Extract text content
      const textMatch = description.match(/['"]([^'"]+)['"]/);
      if (textMatch) {
        properties.text = textMatch[1];
      } else {
        // Look for text after action words
        const actionWords = ['create', 'make', 'show', 'display', 'add', 'have'];
        for (const word of actionWords) {
          const regex = new RegExp(`${word}\\s+(\\w+)`, 'i');
          const match = description.match(regex);
          if (match && match[1]) {
            properties.text = match[1];
            break;
          }
        }
      }
    }
    
    // Form-specific properties
    if (componentType === 'form') {
      const fieldTypes = [];
      if (lowerDesc.includes('email')) fieldTypes.push({ type: 'email', label: 'Email' });
      if (lowerDesc.includes('password')) fieldTypes.push({ type: 'password', label: 'Password' });
      if (lowerDesc.includes('name') || lowerDesc.includes('text')) fieldTypes.push({ type: 'text', label: 'Name' });
      if (lowerDesc.includes('phone') || lowerDesc.includes('tel')) fieldTypes.push({ type: 'tel', label: 'Phone' });
      if (lowerDesc.includes('url')) fieldTypes.push({ type: 'url', label: 'Website' });
      if (lowerDesc.includes('number')) fieldTypes.push({ type: 'number', label: 'Number' });
      
      properties.fields = fieldTypes;
    }
    
    // Layout-specific properties
    if (componentType === 'layout') {
      if (lowerDesc.includes('grid')) properties.layoutType = 'grid';
      else if (lowerDesc.includes('flex') || lowerDesc.includes('row') || lowerDesc.includes('column')) properties.layoutType = 'flex';
      else properties.layoutType = 'flex';
      
      if (lowerDesc.includes('responsive')) properties.responsive = true;
      if (lowerDesc.includes('mobile')) properties.mobileFriendly = true;
    }
    
    // Extract styling preferences
    const styling: Record<string, any> = {};
    if (lowerDesc.includes('dark') || lowerDesc.includes('dark mode')) styling.theme = 'dark';
    if (lowerDesc.includes('light') || lowerDesc.includes('light mode')) styling.theme = 'light';
    
    // Extract behavior requirements
    const behavior: Record<string, any> = {};
    if (lowerDesc.includes('click') || lowerDesc.includes('onclick')) behavior.hasClickHandler = true;
    if (lowerDesc.includes('hover')) behavior.hasHoverEffect = true;
    if (lowerDesc.includes('disabled')) behavior.disabled = true;
    
    return {
      type: componentType,
      properties,
      styling,
      behavior
    };
  }

  /**
   * Validate and parse component description
   */
  static validateDescription(description: string): z.infer<typeof ComponentDescriptionSchema> {
    return ComponentDescriptionSchema.parse({ description });
  }

  /**
   * Normalize component description for consistent processing
   */
  static normalizeDescription(description: string): string {
    // Remove extra whitespace and normalize the description
    return description
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/[.!?]+$/, ''); // Remove trailing punctuation
  }
}

export { ComponentNLP, ComponentIntent, ComponentDescriptionSchema };