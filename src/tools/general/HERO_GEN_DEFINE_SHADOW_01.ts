import { z } from 'zod';
import { Tool } from '../../server/registry';
import { ShadowStyleObjectSchema, ShadowStyleObject } from '../../objects/schemas';
import { crud } from '../../objects/crud';

export const inputSchema = z.object({
  name: z.string().optional().describe("Optional name for the shadow style."),
  color: z.string().describe("The base color of the shadow in hex format (e.g., #RRGGBB)."),
  elevations: ShadowStyleObjectSchema.shape.elevations.describe("Defines shadow properties for different elevation levels (sm, md, lg, xl)."),
  metadata: ShadowStyleObjectSchema.shape.metadata.omit({ createdAt: true, createdBy: true, usageCount: true }).describe("Additional metadata for the shadow style."),
});

export const outputSchema = z.object({
  hash: z.string().describe("The unique hash of the newly created ShadowStyleObject."),
  object: ShadowStyleObjectSchema.describe("The complete ShadowStyleObject that was created."),
});

export const HERO_GEN_DEFINE_SHADOW_01: Tool = {
  id: "HERO_GEN_DEFINE_SHADOW_01",
  name: "Define Shadow Style",
  description: "Defines and stores a new shadow style based on provided specifications.",
  inputSchema: inputSchema,
  outputSchema: outputSchema,
  execute: async (input: z.infer<typeof inputSchema>) => {
    const newShadowStyle: Omit<ShadowStyleObject, 'hash'> = {
      objectType: "shadow_style",
      name: input.name,
      color: input.color,
      elevations: input.elevations,
      metadata: {
        ...input.metadata,
        createdAt: new Date().toISOString(),
        createdBy: "ai",
        usageCount: 0,
      },
    };

    const createdObject = crud.create(newShadowStyle);
    return { hash: createdObject.hash, object: createdObject };
  },
};


