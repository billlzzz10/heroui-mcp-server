import { HERO_AI_02 } from '../../../src/tools/ai/HERO_AI_02.js';
import { ComponentGenerator } from '../../../src/utils/component-generator.js';

// Mock the ComponentGenerator
jest.mock('../../../src/utils/component-generator.js', () => {
  return {
    ComponentGenerator: {
      generate: jest.fn().mockResolvedValue({
        html: '<button class="bg-green-500">Submit Button</button>',
        css: '.bg-green-500 { background-color: green; }',
        js: 'console.log("submit clicked");',
        componentType: 'button',
        description: 'A submit button',
        validation: {
          isValid: true,
          errors: [],
          warnings: [],
          accessibilityScore: 85
        }
      })
    }
  };
});

describe('HERO_AI_02 - generate_button', () => {
  test('should generate button with specified properties', async () => {
    const args = {
      description: 'A submit button',
      variant: 'success',
      size: 'large',
      text: 'Submit'
    };
    
    const result = await HERO_AI_02.execute(args);
    
    expect(result.content[0].text).toContain('AI Button Generation Result');
    expect(result.content[0].text).toContain('Submit Button');
    expect(result.content[0].text).toContain('Component Type: button');
  });

  test('should generate button with minimal args', async () => {
    const args = {
      description: 'A simple button'
    };
    
    const result = await HERO_AI_02.execute(args);
    
    expect(result.content[0].text).toContain('AI Button Generation Result');
    expect(ComponentGenerator.generate).toHaveBeenCalledWith(
      'A button component: A simple button',
      'button'
    );
  });

  test('should handle error from component generator', async () => {
    // Mock an error from the component generator
    (ComponentGenerator.generate as jest.MockedFunction<any>).mockRejectedValue(
      new Error('Test error')
    );
    
    const args = { description: 'A button' };
    
    const result = await HERO_AI_02.execute(args);
    
    expect(result.content[0].text).toContain('Error generating button: Test error');
  });
});