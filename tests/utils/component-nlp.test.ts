import { ComponentNLP } from '../../src/utils/component-nlp.js';

describe('ComponentNLP', () => {
  test('should extract button intent from description', async () => {
    const description = 'Create a large red button that says "Submit"';
    const intent = await ComponentNLP.extractIntent(description);
    
    expect(intent.type).toBe('button');
    expect(intent.properties.size).toBe('large');
    expect(intent.properties.variant).toBe('danger'); // red maps to danger
    expect(intent.properties.text).toBe('Submit');
  });

  test('should extract form intent from description', async () => {
    const description = 'Create a form with email and password fields';
    const intent = await ComponentNLP.extractIntent(description);
    
    expect(intent.type).toBe('form');
    expect(intent.properties.fields).toContainEqual({ type: 'email', label: 'Email' });
    expect(intent.properties.fields).toContainEqual({ type: 'password', label: 'Password' });
  });

  test('should extract layout intent from description', async () => {
    const description = 'Create a responsive grid layout';
    const intent = await ComponentNLP.extractIntent(description);
    
    expect(intent.type).toBe('layout');
    expect(intent.properties.layoutType).toBe('grid');
    expect(intent.properties.responsive).toBe(true);
  });

  test('should normalize description properly', () => {
    const rawDescription = '  Create   a   button  with text "Click Me".  ';
    const normalized = ComponentNLP.normalizeDescription(rawDescription);
    
    expect(normalized).toBe('Create a button with text "Click Me"');
  });

  test('should validate description correctly', () => {
    const validDescription = 'Create a primary button';
    
    expect(() => {
      ComponentNLP.validateDescription(validDescription);
    }).not.toThrow();
    
    expect(() => {
      ComponentNLP.validateDescription('');
    }).toThrow();
  });
});