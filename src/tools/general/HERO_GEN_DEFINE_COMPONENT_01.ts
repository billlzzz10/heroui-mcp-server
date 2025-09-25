import { z } from 'zod';
import { Tool } from '../../server/registry';
import { ComponentVariantObjectSchema, ComponentVariantObject } from '../../objects/schemas';
import { crud } from '../../objects/crud';

export const inputSchema = z.object({
  targetComponent: z.string().describe("The name or identifier of the base component this variant is for."),
  name: z.string().optional().describe("Optional name for this component variant."),
  props: z.record(z.string(), z.any()).describe("A key-value pair of props specific to this component variant."),
  styleObjectHashes: z.object({
    colorPaletteHash: z.string().optional(),
    typographyScaleHash: z.string().optional(),
    spacingSystemHash: z.string().optional(),
    shadowStyleHash: z.string().optional(),
  }).describe("Hashes of associated style objects (color, typography, spacing, shadow)."),
  children: z.union([z.string(), z.array(z.lazy(() => ComponentVariantObjectSchema))]).optional().describe("Optional children components or content for this variant."),
  metadata: z.object({
    createdAt: z.string().optional(),
    createdBy: z.union([z.literal("user"), z.literal("ai"), z.literal("system")]).optional(),
    tags: z.array(z.string()).optional(),
    usageCount: z.number().optional(),
    successScore: z.number().optional(),
  }).partial().describe("Additional metadata for the component variant."),
});

export const outputSchema = z.object({
  hash: z.string().describe("The unique hash of the newly created ComponentVariantObject."),
  object: ComponentVariantObjectSchema.describe("The complete ComponentVariantObject that was created."),
});

export const HERO_GEN_DEFINE_COMPONENT_01: Tool = {
  id: "HERO_GEN_DEFINE_COMPONENT_01",
  name: "Define Component Variant",
  description: "Defines and stores a new component variant based on provided specifications.",
  inputSchema: inputSchema,
  outputSchema: outputSchema,
  execute: async (input: z.infer<typeof inputSchema>) => {
    const newComponentVariant: Omit<ComponentVariantObject, 'hash'> = {
      objectType: "component_variant",
      targetComponent: input.targetComponent,
      name: input.name,
      props: input.props,
      styleObjectHashes: input.styleObjectHashes,
      children: input.children,
      metadata: {
        ...(input.metadata || {}),
        createdAt: new Date().toISOString(),
        createdBy: "ai",
        usageCount: 0,
        successScore: 0, // Default success score
      },
    };

    const createdObject = crud.create(newComponentVariant);
    return { hash: createdObject.hash, object: createdObject };
  },
};


