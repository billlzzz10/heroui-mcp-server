import { z } from 'zod';
import { Tool } from '../../server/registry';
import { SpacingSystemObjectSchema, SpacingSystemObject } from '../../objects/schemas';
import { crud } from '../../objects/crud';

export const inputSchema = z.object({
  name: z.string().optional().describe("Optional name for the spacing system."),
  baseUnit: z.number().describe("The base unit in pixels for the spacing system (e.g., 4, 8, 16)."),
  scale: SpacingSystemObjectSchema.shape.scale.describe("A record of spacing tokens (e.g., 'xs', 'sm', 'md') to their calculated pixel values."),
  metadata: SpacingSystemObjectSchema.shape.metadata.omit({ createdAt: true, createdBy: true, usageCount: true }).describe("Additional metadata for the spacing system."),
});

export const outputSchema = z.object({
  hash: z.string().describe("The unique hash of the newly created SpacingSystemObject."),
  object: SpacingSystemObjectSchema.describe("The complete SpacingSystemObject that was created."),
});

export const HERO_GEN_DEFINE_SPACING_01: Tool = {
  id: "HERO_GEN_DEFINE_SPACING_01",
  name: "Define Spacing System",
  description: "Defines and stores a new spacing system based on provided specifications.",
  inputSchema: inputSchema,
  outputSchema: outputSchema,
  execute: async (input: z.infer<typeof inputSchema>) => {
    const newSpacingSystem: Omit<SpacingSystemObject, 'hash'> = {
      objectType: "spacing_system",
      name: input.name,
      baseUnit: input.baseUnit,
      scale: input.scale,
      metadata: {
        ...input.metadata,
        createdAt: new Date().toISOString(),
        createdBy: "ai",
        usageCount: 0,
      },
    };

    const createdObject = crud.create(newSpacingSystem);
    return { hash: createdObject.hash, object: createdObject };
  },
};


