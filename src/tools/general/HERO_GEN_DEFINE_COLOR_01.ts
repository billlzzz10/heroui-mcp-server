import { z } from 'zod';
import { Tool } from '../../server/registry';
import { ColorPaletteObjectSchema, ColorPaletteObject } from '../../objects/schemas';
import { crud } from '../../objects/crud';

export const inputSchema = z.object({
  name: z.string().optional().describe("Optional name for the color palette."),
  generationMethod: ColorPaletteObjectSchema.shape.generationMethod.describe("Method used to generate the color palette."),
  baseColor: z.string().describe("The base color in hex format (e.g., #RRGGBB) for palette generation."),
  palette: ColorPaletteObjectSchema.shape.palette.describe("The primary, secondary, accent, and neutral colors in hex format."),
  semantic: ColorPaletteObjectSchema.shape.semantic.describe("Semantic color assignments for background, surface, text, border, and feedback."),
  metadata: ColorPaletteObjectSchema.shape.metadata.omit({ createdAt: true, createdBy: true, usageCount: true }).describe("Additional metadata for the color palette."),
});

export const outputSchema = z.object({
  hash: z.string().describe("The unique hash of the newly created ColorPaletteObject."),
  object: ColorPaletteObjectSchema.describe("The complete ColorPaletteObject that was created."),
});

export const HERO_GEN_DEFINE_COLOR_01: Tool = {
  id: "HERO_GEN_DEFINE_COLOR_01",
  name: "Define Color Palette",
  description: "Defines and stores a new color palette based on provided specifications.",
  inputSchema: inputSchema,
  outputSchema: outputSchema,
  execute: async (input: z.infer<typeof inputSchema>) => {
    const newColorPalette: Omit<ColorPaletteObject, 'hash'> = {
      objectType: "color_palette",
      name: input.name,
      generationMethod: input.generationMethod,
      baseColor: input.baseColor,
      palette: input.palette,
      semantic: input.semantic,
      metadata: {
        ...input.metadata,
        createdAt: new Date().toISOString(),
        createdBy: "ai", // Assuming AI creates this via tool
        usageCount: 0,
      },
    };

    const createdObject = crud.create(newColorPalette);
    return { hash: createdObject.hash, object: createdObject };
  },
};


