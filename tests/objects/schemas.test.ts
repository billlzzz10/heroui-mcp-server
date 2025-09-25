import { z } from 'zod';
import {
  ColorPaletteObjectSchema,
  TypographyScaleObjectSchema,
  SpacingSystemObjectSchema,
  ShadowStyleObjectSchema,
  InteractionStyleObjectSchema,
  ComponentVariantObjectSchema,
  LayoutCompositionObjectSchema,
  TemplateObjectSchema,
  MCPObjectSchema,
} from '../../src/objects/schemas';

describe('ColorPaletteObjectSchema', () => {
  it('should validate a correct color palette object', () => {
    const validColorPalette = {
      hash: 'somehash123',
      objectType: 'color_palette',
      name: 'Primary Palette',
      generationMethod: 'monochromatic',
      baseColor: '#FF0000',
      palette: {
        primary: '#FF0000',
        secondary: '#00FF00',
        accent: '#0000FF',
        neutral: '#CCCCCC',
      },
      semantic: {
        background: '#FFFFFF',
        surface: '#F0F0F0',
        text: {
          primary: '#333333',
          secondary: '#666666',
          disabled: '#999999',
        },
        border: {
          default: '#AAAAAA',
          subtle: '#DDDDDD',
        },
        feedback: {
          success: '#00FF00',
          warning: '#FFFF00',
          error: '#FF0000',
        },
      },
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: 'user',
        tags: ['web', 'dark'],
        usageCount: 10,
        suitability: {
          lightMode: true,
          darkMode: false,
          highContrast: true,
        },
      },
    };
    expect(() => ColorPaletteObjectSchema.parse(validColorPalette)).not.toThrow();
  });

  it('should reject an invalid color palette object', () => {
    const invalidColorPalette = {
      hash: 'somehash123',
      objectType: 'color_palette',
      // Missing required fields
      baseColor: '#FF0000',
      palette: {
        primary: '#FF0000',
        secondary: '#00FF00',
        accent: '#0000FF',
        neutral: '#CCCCCC',
      },
      semantic: {
        background: '#FFFFFF',
        surface: '#F0F0F0',
        text: {
          primary: '#333333',
          secondary: '#666666',
          disabled: '#999999',
        },
        border: {
          default: '#AAAAAA',
          subtle: '#DDDDDD',
        },
        feedback: {
          success: '#00FF00',
          warning: '#FFFF00',
          error: '#FF0000',
        },
      },
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: 'user',
        tags: ['web', 'dark'],
        usageCount: 10,
        suitability: {
          lightMode: true,
          darkMode: false,
          highContrast: true,
        },
      },
    };
    expect(() => ColorPaletteObjectSchema.parse(invalidColorPalette)).toThrow(z.ZodError);
  });
});

describe('TypographyScaleObjectSchema', () => {
  it('should validate a correct typography scale object', () => {
    const validTypographyScale = {
      hash: 'somehash456',
      objectType: 'typography_scale',
      name: 'Responsive Type Scale',
      fontFamily: 'Inter',
      scaleRatio: 1.25,
      hierarchy: {
        h1: { fontSize: '4rem', fontWeight: 700, lineHeight: 1.2 },
        h2: { fontSize: '3rem', fontWeight: 600, lineHeight: 1.3 },
        h3: { fontSize: '2.25rem', fontWeight: 500, lineHeight: 1.4 },
        h4: { fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.5 },
        body: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.6 },
        caption: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.7 },
        label: { fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.8 },
      },
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: 'ai',
        tags: ['responsive', 'modern'],
        usageCount: 5,
      },
    };
    expect(() => TypographyScaleObjectSchema.parse(validTypographyScale)).not.toThrow();
  });

  it('should reject an invalid typography scale object', () => {
    const invalidTypographyScale = {
      hash: 'somehash456',
      objectType: 'typography_scale',
      fontFamily: 'Inter',
      // Missing scaleRatio
      hierarchy: {
        h1: { fontSize: '4rem', fontWeight: 700, lineHeight: 1.2 },
        h2: { fontSize: '3rem', fontWeight: 600, lineHeight: 1.3 },
        h3: { fontSize: '2.25rem', fontWeight: 500, lineHeight: 1.4 },
        h4: { fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.5 },
        body: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.6 },
        caption: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.7 },
        label: { fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.8 },
      },
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: 'ai',
        tags: ['responsive', 'modern'],
        usageCount: 5,
      },
    };
    expect(() => TypographyScaleObjectSchema.parse(invalidTypographyScale)).toThrow(z.ZodError);
  });
});

describe('SpacingSystemObjectSchema', () => {
  it('should validate a correct spacing system object', () => {
    const validSpacingSystem = {
      hash: 'somehash789',
      objectType: 'spacing_system',
      name: 'Modular Spacing',
      baseUnit: 8,
      scale: {
        '0': 0,
        '1': 4,
        '2': 8,
        '3': 16,
        '4': 24,
        '5': 32,
      },
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: 'system',
        tags: ['grid', 'responsive'],
        usageCount: 20,
      },
    };
    expect(() => SpacingSystemObjectSchema.parse(validSpacingSystem)).not.toThrow();
  });

  it('should reject an invalid spacing system object', () => {
    const invalidSpacingSystem = {
      hash: 'somehash789',
      objectType: 'spacing_system',
      baseUnit: 8,
      // Missing scale
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: 'system',
        tags: ['grid', 'responsive'],
        usageCount: 20,
      },
    };
    expect(() => SpacingSystemObjectSchema.parse(invalidSpacingSystem)).toThrow(z.ZodError);
  });
});

describe('ShadowStyleObjectSchema', () => {
  it('should validate a correct shadow style object', () => {
    const validShadowStyle = {
      hash: 'somehash101',
      objectType: 'shadow_style',
      name: 'Material Shadows',
      color: '#00000080',
      elevations: {
        sm: { offsetX: 0, offsetY: 1, blur: 2, spread: 0 },
        md: { offsetX: 0, offsetY: 3, blur: 6, spread: 0 },
        lg: { offsetX: 0, offsetY: 10, blur: 20, spread: 0 },
        xl: { offsetX: 0, offsetY: 20, blur: 40, spread: 0 },
      },
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: 'user',
        tags: ['material', 'elevation'],
        usageCount: 15,
      },
    };
    expect(() => ShadowStyleObjectSchema.parse(validShadowStyle)).not.toThrow();
  });

  it('should reject an invalid shadow style object', () => {
    const invalidShadowStyle = {
      hash: 'somehash101',
      objectType: 'shadow_style',
      color: '#00000080',
      // Missing elevations
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: 'user',
        tags: ['material', 'elevation'],
        usageCount: 15,
      },
    };
    expect(() => ShadowStyleObjectSchema.parse(invalidShadowStyle)).toThrow(z.ZodError);
  });
});

describe('InteractionStyleObjectSchema', () => {
  it('should validate a correct interaction style object', () => {
    const validInteractionStyle = {
      hash: 'somehash112',
      objectType: 'interaction_style',
      name: 'Button Hover',
      states: {
        default: { backgroundColor: '#007bff', color: '#ffffff' },
        hover: { backgroundColor: '#0056b3' },
        active: { backgroundColor: '#004085' },
        focus: { outline: '2px solid #007bff' },
        disabled: { opacity: 0.5, cursor: 'not-allowed' },
      },
      transitions: {
        duration: 'normal',
        easing: 'ease-in',
        properties: ['background-color', 'color', 'opacity'],
      },
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: 'ai',
        tags: ['button', 'hover'],
        usageCount: 8,
      },
    };
    expect(() => InteractionStyleObjectSchema.parse(validInteractionStyle)).not.toThrow();
  });

  it('should reject an invalid interaction style object', () => {
    const invalidInteractionStyle = {
      hash: 'somehash112',
      objectType: 'interaction_style',
      name: 'Button Hover',
      states: {
        default: { backgroundColor: '#007bff', color: '#ffffff' },
        hover: { backgroundColor: '#0056b3' },
        active: { backgroundColor: '#004085' },
        focus: { outline: '2px solid #007bff' },
        disabled: { opacity: 0.5, cursor: 'not-allowed' },
      },
      // Missing transitions
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: 'ai',
        tags: ['button', 'hover'],
        usageCount: 8,
      },
    };
    expect(() => InteractionStyleObjectSchema.parse(invalidInteractionStyle)).toThrow(z.ZodError);
  });
});

describe('ComponentVariantObjectSchema', () => {
  it('should validate a correct component variant object', () => {
    const validComponentVariant = {
      hash: 'somehash223',
      objectType: 'component_variant',
      targetComponent: 'Button',
      name: 'Primary Button',
      props: { size: 'medium', color: 'primary' },
      styleObjectHashes: {
        colorPaletteHash: 'colorhash1',
        typographyScaleHash: 'typohash1',
      },
      children: 'Click Me',
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: 'user',
        tags: ['button', 'primary'],
        usageCount: 50,
        successScore: 0.95,
      },
    };
    expect(() => ComponentVariantObjectSchema.parse(validComponentVariant)).not.toThrow();
  });

  it('should handle recursive children validation', () => {
    const nestedComponentVariant = {
      hash: 'somehash224',
      objectType: 'component_variant',
      targetComponent: 'Card',
      name: 'Card with Button',
      props: { elevation: 'md' },
      styleObjectHashes: {},
      children: [
        {
          hash: 'somehash225',
          objectType: 'component_variant',
          targetComponent: 'Text',
          name: 'Card Title',
          props: { variant: 'h3' },
          styleObjectHashes: {},
          metadata: {
            createdAt: new Date().toISOString(),
            createdBy: 'ai',
            tags: [],
            usageCount: 1,
          },
        },
        {
          hash: 'somehash226',
          objectType: 'component_variant',
          targetComponent: 'Button',
          name: 'Card Action Button',
          props: { size: 'small' },
          styleObjectHashes: {},
          metadata: {
            createdAt: new Date().toISOString(),
            createdBy: 'ai',
            tags: [],
            usageCount: 1,
          },
        },
      ],
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: 'user',
        tags: ['card', 'nested'],
        usageCount: 5,
        successScore: 0.8,
      },
    };
    expect(() => ComponentVariantObjectSchema.parse(nestedComponentVariant)).not.toThrow();
  });

  it('should reject an invalid component variant object', () => {
    const invalidComponentVariant = {
      hash: 'somehash223',
      objectType: 'component_variant',
      // Missing targetComponent
      name: 'Primary Button',
      props: { size: 'medium', color: 'primary' },
      styleObjectHashes: {},
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: 'user',
        tags: ['button', 'primary'],
        usageCount: 50,
        successScore: 0.95,
      },
    };
    expect(() => ComponentVariantObjectSchema.parse(invalidComponentVariant)).toThrow(z.ZodError);
  });
});

describe('LayoutCompositionObjectSchema', () => {
  it('should validate a correct layout composition object', () => {
    const validLayoutComposition = {
      hash: 'somehash334',
      objectType: 'layout_composition',
      name: 'Hero Section',
      containerType: 'flex',
      containerStyles: { display: 'flex', justifyContent: 'center' },
      responsiveStyles: {
        sm: { flexDirection: 'column' },
        md: { flexDirection: 'row' },
      },
      slots: {
        main: [
          {
            hash: 'somehash335',
            objectType: 'component_variant',
            targetComponent: 'Heading',
            name: 'Hero Title',
            props: { level: 1 },
            styleObjectHashes: {},
            metadata: {
              createdAt: new Date().toISOString(),
              createdBy: 'ai',
              tags: [],
              usageCount: 1,
            },
          },
        ],
      },
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: 'user',
        tags: ['hero', 'landing'],
        usageCount: 12,
      },
    };
    expect(() => LayoutCompositionObjectSchema.parse(validLayoutComposition)).not.toThrow();
  });

  it('should handle recursive slots validation', () => {
    const nestedLayoutComposition = {
      hash: 'somehash336',
      objectType: 'layout_composition',
      name: 'Complex Layout',
      containerType: 'grid',
      containerStyles: { gridTemplateColumns: '1fr 2fr' },
      responsiveStyles: {},
      slots: {
        sidebar: [
          {
            hash: 'somehash337',
            objectType: 'component_variant',
            targetComponent: 'Navigation',
            name: 'Main Nav',
            props: { items: [] },
            styleObjectHashes: {},
            metadata: {
              createdAt: new Date().toISOString(),
              createdBy: 'ai',
              tags: [],
              usageCount: 1,
            },
          },
        ],
        content: [
          {
            hash: 'somehash338',
            objectType: 'layout_composition',
            name: 'Content Header',
            containerType: 'flex',
            containerStyles: { justifyContent: 'space-between' },
            responsiveStyles: {},
            slots: {
              left: [
                {
                  hash: 'somehash339',
                  objectType: 'component_variant',
                  targetComponent: 'Text',
                  name: 'Page Title',
                  props: { variant: 'h2' },
                  styleObjectHashes: {},
                  metadata: {
                    createdAt: new Date().toISOString(),
                    createdBy: 'ai',
                    tags: [],
                    usageCount: 1,
                  },
                },
              ],
              right: [],
            },
            metadata: {
              createdAt: new Date().toISOString(),
              createdBy: 'ai',
              tags: [],
              usageCount: 1,
            },
          },
        ],
      },
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: 'user',
        tags: ['complex', 'dashboard'],
        usageCount: 3,
      },
    };
    expect(() => LayoutCompositionObjectSchema.parse(nestedLayoutComposition)).not.toThrow();
  });

  it('should reject an invalid layout composition object', () => {
    const invalidLayoutComposition = {
      hash: 'somehash334',
      objectType: 'layout_composition',
      name: 'Hero Section',
      // Missing containerType
      containerStyles: { display: 'flex', justifyContent: 'center' },
      responsiveStyles: {},
      slots: {},
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: 'user',
        tags: ['hero', 'landing'],
        usageCount: 12,
      },
    };
    expect(() => LayoutCompositionObjectSchema.parse(invalidLayoutComposition)).toThrow(z.ZodError);
  });
});

describe('TemplateObjectSchema', () => {
  it('should validate a correct template object', () => {
    const validTemplate = {
      hash: 'somehash445',
      objectType: 'template',
      name: 'Landing Page Template',
      description: 'A standard landing page template.',
      templateType: 'landing',
      version: '1.0.0',
      previewImageUrl: 'https://example.com/preview.jpg',
      rootLayoutHash: 'layoutHash123',
      recommendedStyleHashes: {
        lightModeColorHash: 'colorHashLight',
        darkModeColorHash: 'colorHashDark',
        typographyHash: 'typographyHash1',
        spacingHash: 'spacingHash1',
        shadowHash: 'shadowHash1',
      },
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: 'system',
        tags: ['landing', 'marketing'],
        usageCount: 100,
        compatibility: {
          desktop: 'full',
          tablet: 'full',
          mobile: 'partial',
        },
      },
    };
    expect(() => TemplateObjectSchema.parse(validTemplate)).not.toThrow();
  });

  it('should reject an invalid template object', () => {
    const invalidTemplate = {
      hash: 'somehash445',
      objectType: 'template',
      name: 'Landing Page Template',
      description: 'A standard landing page template.',
      templateType: 'landing',
      version: '1.0.0',
      // Missing rootLayoutHash
      recommendedStyleHashes: {
        lightModeColorHash: 'colorHashLight',
        darkModeColorHash: 'colorHashDark',
        typographyHash: 'typographyHash1',
        spacingHash: 'spacingHash1',
        shadowHash: 'shadowHash1',
      },
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: 'system',
        tags: ['landing', 'marketing'],
        usageCount: 100,
        compatibility: {
          desktop: 'full',
          tablet: 'full',
          mobile: 'partial',
        },
      },
    };
    expect(() => TemplateObjectSchema.parse(invalidTemplate)).toThrow(z.ZodError);
  });
});

describe('MCPObjectSchema', () => {
  it('should validate any valid MCP object', () => {
    const validColorPalette = {
      hash: 'somehash123',
      objectType: 'color_palette',
      name: 'Primary Palette',
      generationMethod: 'monochromatic',
      baseColor: '#FF0000',
      palette: {
        primary: '#FF0000',
        secondary: '#00FF00',
        accent: '#0000FF',
        neutral: '#CCCCCC',
      },
      semantic: {
        background: '#FFFFFF',
        surface: '#F0F0F0',
        text: {
          primary: '#333333',
          secondary: '#666666',
          disabled: '#999999',
        },
        border: {
          default: '#AAAAAA',
          subtle: '#DDDDDD',
        },
        feedback: {
          success: '#00FF00',
          warning: '#FFFF00',
          error: '#FF0000',
        },
      },
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: 'user',
        tags: ['web', 'dark'],
        usageCount: 10,
        suitability: {
          lightMode: true,
          darkMode: false,
          highContrast: true,
        },
      },
    };
    expect(() => MCPObjectSchema.parse(validColorPalette)).not.toThrow();

    const validTypographyScale = {
      hash: 'somehash456',
      objectType: 'typography_scale',
      name: 'Responsive Type Scale',
      fontFamily: 'Inter',
      scaleRatio: 1.25,
      hierarchy: {
        h1: { fontSize: '4rem', fontWeight: 700, lineHeight: 1.2 },
        h2: { fontSize: '3rem', fontWeight: 600, lineHeight: 1.3 },
        h3: { fontSize: '2.25rem', fontWeight: 500, lineHeight: 1.4 },
        h4: { fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.5 },
        body: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.6 },
        caption: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.7 },
        label: { fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.8 },
      },
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: 'ai',
        tags: ['responsive', 'modern'],
        usageCount: 5,
      },
    };
    expect(() => MCPObjectSchema.parse(validTypographyScale)).not.toThrow();
  });

  it('should reject an invalid MCP object type', () => {
    const invalidObject = {
      hash: 'somehashInvalid',
      objectType: 'unknown_type',
      // ... other fields
    };
    expect(() => MCPObjectSchema.parse(invalidObject)).toThrow(z.ZodError);
  });
});


