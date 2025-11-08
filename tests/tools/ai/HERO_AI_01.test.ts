import { HERO_AI_01 } from '../../../src/tools/ai/HERO_AI_01.js';
import { ComponentGenerator } from '../../../src/utils/component-generator.js';

// Mock the ComponentGenerator
jest.mock('../../../src/utils/component-generator.js', () => {
  return {
    ComponentGenerator: {
      generate: jest.fn().mockResolvedValue({
        html: '<button class="bg-blue-500">Generated Button</button>',
        css: '.bg-blue-500 { background-color: blue; }',
        js: 'console.log("button clicked");',
        componentType: 'button',
        description: 'A blue button',
        validation: {
          isValid: true,
          errors: [],
          warnings: [],
          accessibilityScore: 90
        }
      })
    }
  };
});

describe('HERO_AI_01 - generate_component', () => {
  test('should generate component successfully', async () => {
    const args = {
      description: 'A primary button with text "Submit"'
    };
    
    const result = await HERO_AI_01.execute(args);
    
    expect(result.content[0].text).toContain('AI Component Generation Result');
    expect(result.content[0].text).toContain('Generated Button');
    expect(result.content[0].text).toContain('Component Type: button');
  });

  test('should handle missing description', async () => {
    const args = {};
    
    const result = await HERO_AI_01.execute(args);
    
    expect(result.content[0].text).toContain('Error: Component description is required');
  });

  test('should handle empty description', async () => {
    const args = { description: '' };
    
    const result = await HERO_AI_01.execute(args);
    
    expect(result.content[0].text).toContain('Error: Component description is required');
  });

  test('should handle error from component generator', async () => {
    // Mock an error from the component generator
    (ComponentGenerator.generate as jest.MockedFunction<any>).mockRejectedValue(
      new Error('Test error')
    );
    
    const args = { description: 'A button' };
    
    const result = await HERO_AI_01.execute(args);
    
    expect(result.content[0].text).toContain('Error generating component: Test error');
  });
});