import { z } from 'zod';

// 1. Color Palette Object
export const ColorPaletteObjectSchema = z.object({
  hash: z.string(),
  objectType: z.literal('color_palette'),
  name: z.string().optional(),
  generationMethod: z.union([
    z.literal('monochromatic'),
    z.literal('complementary'),
    z.literal('triadic'),
    z.literal('analogous'),
    z.literal('split-complementary'),
    z.literal('from-image'),
    z.literal('manual'),
  ]),
  baseColor: z.string(),
  palette: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
    neutral: z.string(),
  }),
  semantic: z.object({
    background: z.string(),
    surface: z.string(),
    text: z.object({
      primary: z.string(),
      secondary: z.string(),
      disabled: z.string(),
    }),
    border: z.object({
      default: z.string(),
      subtle: z.string(),
    }),
    feedback: z.object({
      success: z.string(),
      warning: z.string(),
      error: z.string(),
    }),
  }),
  metadata: z.object({
    createdAt: z.string(),
    createdBy: z.union([z.literal('user'), z.literal('ai'), z.literal('system')]),
    tags: z.array(z.string()),
    usageCount: z.number(),
    suitability: z.object({
      lightMode: z.boolean(),
      darkMode: z.boolean(),
      highContrast: z.boolean(),
    }),
  }),
});
export type ColorPaletteObject = z.infer<typeof ColorPaletteObjectSchema>;

// 2. Typography Scale Object
export const TypographyScaleObjectSchema = z.object({
  hash: z.string(),
  objectType: z.literal('typography_scale'),
  name: z.string().optional(),
  fontFamily: z.string(),
  scaleRatio: z.number(),
  hierarchy: z.object({
    h1: z.object({ fontSize: z.string(), fontWeight: z.number(), lineHeight: z.number() }),
    h2: z.object({ fontSize: z.string(), fontWeight: z.number(), lineHeight: z.number() }),
    h3: z.object({ fontSize: z.string(), fontWeight: z.number(), lineHeight: z.number() }),
    h4: z.object({ fontSize: z.string(), fontWeight: z.number(), lineHeight: z.number() }),
    body: z.object({ fontSize: z.string(), fontWeight: z.number(), lineHeight: z.number() }),
    caption: z.object({ fontSize: z.string(), fontWeight: z.number(), lineHeight: z.number() }),
    label: z.object({ fontSize: z.string(), fontWeight: z.number(), lineHeight: z.number() }),
  }),
  metadata: z.object({
    createdAt: z.string(),
    createdBy: z.union([z.literal('user'), z.literal('ai'), z.literal('system')]),
    tags: z.array(z.string()),
    usageCount: z.number(),
  }),
});
export type TypographyScaleObject = z.infer<typeof TypographyScaleObjectSchema>;

// 3. Spacing System Object
export const SpacingSystemObjectSchema = z.object({
  hash: z.string(),
  objectType: z.literal('spacing_system'),
  name: z.string().optional(),
  baseUnit: z.number(),
  scale: z.record(z.string(), z.number()),
  metadata: z.object({
    createdAt: z.string(),
    createdBy: z.union([z.literal('user'), z.literal('ai'), z.literal('system')]),
    tags: z.array(z.string()),
    usageCount: z.number(),
  }),
});
export type SpacingSystemObject = z.infer<typeof SpacingSystemObjectSchema>;

// 4. Shadow Style Object
export const ShadowStyleObjectSchema = z.object({
  hash: z.string(),
  objectType: z.literal('shadow_style'),
  name: z.string().optional(),
  color: z.string(),
  elevations: z.object({
    sm: z.object({ offsetX: z.number(), offsetY: z.number(), blur: z.number(), spread: z.number() }),
    md: z.object({ offsetX: z.number(), offsetY: z.number(), blur: z.number(), spread: z.number() }),
    lg: z.object({ offsetX: z.number(), offsetY: z.number(), blur: z.number(), spread: z.number() }),
    xl: z.object({ offsetX: z.number(), offsetY: z.number(), blur: z.number(), spread: z.number() }),
  }),
  metadata: z.object({
    createdAt: z.string(),
    createdBy: z.union([z.literal('user'), z.literal('ai'), z.literal('system')]),
    tags: z.array(z.string()),
    usageCount: z.number(),
  }),
});
export type ShadowStyleObject = z.infer<typeof ShadowStyleObjectSchema>;

// 5. Interaction Style Object (New/Updated based on blueprint)
export const InteractionStyleObjectSchema = z.object({
  hash: z.string(),
  objectType: z.literal('interaction_style'),
  name: z.string().optional(),
  states: z.object({
    default: z.record(z.string(), z.any()),
    hover: z.record(z.string(), z.any()),
    active: z.record(z.string(), z.any()),
    focus: z.record(z.string(), z.any()),
    disabled: z.record(z.string(), z.any()),
  }),
  transitions: z.object({
    duration: z.union([z.literal('fast'), z.literal('normal'), z.literal('slow')]),
    easing: z.union([z.literal('ease'), z.literal('ease-in'), z.literal('ease-out'), z.literal('bounce')]),
    properties: z.array(z.string()),
  }),
  metadata: z.object({
    createdAt: z.string(),
    createdBy: z.union([z.literal('user'), z.literal('ai'), z.literal('system')]),
    tags: z.array(z.string()),
    usageCount: z.number(),
  }),
});
export type InteractionStyleObject = z.infer<typeof InteractionStyleObjectSchema>;

// 6. Component Variant Object
export const ComponentVariantObjectSchema: z.ZodSchema<any> = z.lazy(() => z.object({
  hash: z.string(),
  objectType: z.literal('component_variant'),
  targetComponent: z.string(),
  name: z.string().optional(),
  props: z.record(z.string(), z.any()),
  styleObjectHashes: z.object({
    colorPaletteHash: z.string().optional(),
    typographyScaleHash: z.string().optional(),
    spacingSystemHash: z.string().optional(),
    shadowStyleHash: z.string().optional(),
  }),
  children: z.union([z.string(), z.array(ComponentVariantObjectSchema)]).optional(), // Recursive definition
  metadata: z.object({
    createdAt: z.string(),
    createdBy: z.union([z.literal('user'), z.literal('ai'), z.literal('system')]),
    tags: z.array(z.string()),
    usageCount: z.number(),
    successScore: z.number().optional(),
  }),
}));
export type ComponentVariantObject = z.infer<typeof ComponentVariantObjectSchema>;

// 7. Layout Composition Object
export const LayoutCompositionObjectSchema: z.ZodSchema<any> = z.lazy(() => z.object({
  hash: z.string(),
  objectType: z.literal('layout_composition'),
  name: z.string().optional(),
  containerType: z.union([z.literal('block'), z.literal('flex'), z.literal('grid')]),
  containerStyles: z.record(z.string(), z.any()),
  responsiveStyles: z.record(z.string(), z.record(z.string(), z.any())),
  slots: z.record(z.string(), z.array(z.union([ComponentVariantObjectSchema, LayoutCompositionObjectSchema]))),
  metadata: z.object({
    createdAt: z.string(),
    createdBy: z.union([z.literal('user'), z.literal('ai'), z.literal('system')]),
    tags: z.array(z.string()),
    usageCount: z.number(),
  }),
}));
export type LayoutCompositionObject = z.infer<typeof LayoutCompositionObjectSchema>;

// 8. Template Object
export const TemplateObjectSchema = z.object({
  hash: z.string(),
  objectType: z.literal('template'),
  name: z.string(),
  description: z.string(),
  templateType: z.union([
    z.literal('landing'),
    z.literal('dashboard'),
    z.literal('ecommerce'),
    z.literal('blog'),
    z.literal('portfolio'),
    z.literal('admin'),
    z.literal('settings'),
    z.literal('profile'),
  ]),
  version: z.string(),
  previewImageUrl: z.string().optional(),
  rootLayoutHash: z.string(),
  recommendedStyleHashes: z.object({
    lightModeColorHash: z.string(),
    darkModeColorHash: z.string(),
    typographyHash: z.string(),
    spacingHash: z.string(),
    shadowHash: z.string(),
  }),
  metadata: z.object({
    createdAt: z.string(),
    createdBy: z.union([z.literal('user'), z.literal('ai'), z.literal('system')]),
    tags: z.array(z.string()),
    usageCount: z.number(),
    compatibility: z.object({
      desktop: z.union([z.literal('full'), z.literal('partial'), z.literal('none')]),
      tablet: z.union([z.literal('full'), z.literal('partial'), z.literal('none')]),
      mobile: z.union([z.literal('full'), z.literal('partial'), z.literal('none')]),
    }),
  }),
});
export type TemplateObject = z.infer<typeof TemplateObjectSchema>;

// Union type for all objects
export const MCPObjectSchema = z.union([
  ColorPaletteObjectSchema,
  TypographyScaleObjectSchema,
  SpacingSystemObjectSchema,
  ShadowStyleObjectSchema,
  InteractionStyleObjectSchema,
  ComponentVariantObjectSchema,
  LayoutCompositionObjectSchema,
  TemplateObjectSchema,
]);
export type MCPObject = z.infer<typeof MCPObjectSchema>;


