import { z } from 'zod';
import { Tool } from '../../server/registry';
import { crud } from '../../objects/crud';
import {
  ColorPaletteObjectSchema,
  ColorPaletteObject,
  TypographyScaleObjectSchema,
  TypographyScaleObject,
  SpacingSystemObjectSchema,
  SpacingSystemObject,
  ShadowStyleObjectSchema,
  ShadowStyleObject,
} from '../../objects/schemas';

export const inputSchema = z.object({
  name: z.string().optional().describe('Optional friendly name for the assembled theme.'),
  colorPaletteHash: z.string().describe('Hash of the color palette to include in the theme.'),
  typographyHash: z.string().describe('Hash of the typography scale to include.'),
  spacingHash: z.string().optional().describe('Optional hash of the spacing system to include.'),
  shadowHash: z.string().optional().describe('Optional hash of the shadow style to include.'),
});

export const outputSchema = z.object({
  name: z.string().optional().describe('Name carried over from the request.'),
  colorPalette: ColorPaletteObjectSchema.describe('Resolved color palette object.'),
  typography: TypographyScaleObjectSchema.describe('Resolved typography scale object.'),
  spacing: SpacingSystemObjectSchema.optional().describe('Resolved spacing system when provided.'),
  shadow: ShadowStyleObjectSchema.optional().describe('Resolved shadow style when provided.'),
  composedAt: z.string().describe('ISO timestamp when the theme bundle was produced.'),
});

function fetchColorPalette(hash: string): ColorPaletteObject {
  const object = crud.read(hash);
  if (!object) {
    throw new Error(`Color palette ${hash} was not found`);
  }
  if (object.objectType !== 'color_palette') {
    throw new Error(`Object ${hash} is ${object.objectType}, expected color_palette`);
  }
  const validation = ColorPaletteObjectSchema.safeParse(object);
  if (!validation.success) {
    throw new Error(`Color palette ${hash} failed validation: ${validation.error.message}`);
  }
  return validation.data;
}

function fetchTypography(hash: string): TypographyScaleObject {
  const object = crud.read(hash);
  if (!object) {
    throw new Error(`Typography scale ${hash} was not found`);
  }
  if (object.objectType !== 'typography_scale') {
    throw new Error(`Object ${hash} is ${object.objectType}, expected typography_scale`);
  }
  const validation = TypographyScaleObjectSchema.safeParse(object);
  if (!validation.success) {
    throw new Error(`Typography scale ${hash} failed validation: ${validation.error.message}`);
  }
  return validation.data;
}

function fetchSpacing(hash?: string): SpacingSystemObject | undefined {
  if (!hash) {
    return undefined;
  }
  const object = crud.read(hash);
  if (!object) {
    throw new Error(`Spacing system ${hash} was not found`);
  }
  if (object.objectType !== 'spacing_system') {
    throw new Error(`Object ${hash} is ${object.objectType}, expected spacing_system`);
  }
  const validation = SpacingSystemObjectSchema.safeParse(object);
  if (!validation.success) {
    throw new Error(`Spacing system ${hash} failed validation: ${validation.error.message}`);
  }
  return validation.data;
}

function fetchShadow(hash?: string): ShadowStyleObject | undefined {
  if (!hash) {
    return undefined;
  }
  const object = crud.read(hash);
  if (!object) {
    throw new Error(`Shadow style ${hash} was not found`);
  }
  if (object.objectType !== 'shadow_style') {
    throw new Error(`Object ${hash} is ${object.objectType}, expected shadow_style`);
  }
  const validation = ShadowStyleObjectSchema.safeParse(object);
  if (!validation.success) {
    throw new Error(`Shadow style ${hash} failed validation: ${validation.error.message}`);
  }
  return validation.data;
}

export const HERO_THEME_PLACEHOLDER_01: Tool = {
  id: 'HERO_THEME_PLACEHOLDER_01',
  name: 'Compose Theme Bundle',
  description: 'Hydrates a theme bundle by resolving the requested style object hashes into fully validated objects.',
  inputSchema,
  outputSchema,
  execute: async (input: z.infer<typeof inputSchema>) => {
    const colorPalette = fetchColorPalette(input.colorPaletteHash);
    const typography = fetchTypography(input.typographyHash);
    const spacing = fetchSpacing(input.spacingHash);
    const shadow = fetchShadow(input.shadowHash);

    return {
      name: input.name,
      colorPalette,
      typography,
      spacing,
      shadow,
      composedAt: new Date().toISOString(),
    };
  },
};
