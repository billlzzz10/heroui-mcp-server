import { z } from 'zod';
import { Tool } from '../../server/registry';
import { TypographyScaleObjectSchema, TypographyScaleObject } from '../../objects/schemas';
import { crud } from '../../objects/crud';

export const inputSchema = z.object({
  name: z.string().optional().describe("Optional name for the typography scale."),
  fontFamily: z.string().describe("The primary font family for the typography scale."),
  scaleRatio: z.number().describe("The ratio used to generate the type scale (e.g., 1.25 for major second)."),
  hierarchy: TypographyScaleObjectSchema.shape.hierarchy.describe("Defines font sizes, weights, and line heights for various text elements."),
  metadata: TypographyScaleObjectSchema.shape.metadata.omit({ createdAt: true, createdBy: true, usageCount: true }).describe("Additional metadata for the typography scale."),
});

export const outputSchema = z.object({
  hash: z.string().describe("The unique hash of the newly created TypographyScaleObject."),
  object: TypographyScaleObjectSchema.describe("The complete TypographyScaleObject that was created."),
});

export const HERO_GEN_DEFINE_TYPO_01: Tool = {
  id: "HERO_GEN_DEFINE_TYPO_01",
  name: "Define Typography Scale",
  description: "Defines and stores a new typography scale based on provided specifications.",
  inputSchema: inputSchema,
  outputSchema: outputSchema,
  execute: async (input: z.infer<typeof inputSchema>) => {
    const newTypographyScale: Omit<TypographyScaleObject, 'hash'> = {
      objectType: "typography_scale",
      name: input.name,
      fontFamily: input.fontFamily,
      scaleRatio: input.scaleRatio,
      hierarchy: input.hierarchy,
      metadata: {
        ...input.metadata,
        createdAt: new Date().toISOString(),
        createdBy: "ai",
        usageCount: 0,
      },
    };

    const createdObject = crud.create(newTypographyScale);
    return { hash: createdObject.hash, object: createdObject };
  },
};


