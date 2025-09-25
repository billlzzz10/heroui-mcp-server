import { z } from 'zod';
import { Tool } from '../../server/registry';
import { ComponentVariantObjectSchema, ComponentVariantObject } from '../../objects/schemas';
import { crud } from '../../objects/crud';

export const inputSchema = z.object({
  name: z.string().optional().describe("Optional name for this pagination component variant."),
  props: z.record(z.string(), z.any()).describe("A key-value pair of props specific to this pagination component variant."),
  children: z.union([z.string(), z.array(z.lazy(() => ComponentVariantObjectSchema))]).optional().describe("Optional children components or content for this variant."),
  metadata: z.object({
    createdAt: z.string().optional(),
    createdBy: z.union([z.literal("user"), z.literal("ai"), z.literal("system")]).optional(),
    tags: z.array(z.string()).optional(),
    usageCount: z.number().optional(),
    successScore: z.number().optional(),
  }).partial().describe("Additional metadata for the pagination component variant."),
});

export const outputSchema = z.object({
  hash: z.string().describe("The unique hash of the newly created ComponentVariantObject."),
  object: ComponentVariantObjectSchema.describe("The complete ComponentVariantObject that was created."),
});

export const HERO_COMP_PAGINATION_01: Tool = {
  id: "HERO_COMP_PAGINATION_01",
  name: "Define Pagination Component Variant",
  description: "Defines and stores a new pagination component variant based on provided specifications.",
  inputSchema: inputSchema,
  outputSchema: outputSchema,
  execute: async (input: z.infer<typeof inputSchema>) => {
    const newComponentVariant: Omit<ComponentVariantObject, 'hash'> = {
      objectType: "component_variant",
      targetComponent: "pagination",
      name: input.name,
      props: input.props,
      styleObjectHashes: {},
      children: input.children,
      metadata: {
        ...(input.metadata || {}),
        createdAt: new Date().toISOString(),
        createdBy: "ai",
        usageCount: 0,
        successScore: 0,
      },
    };

    const createdObject = crud.create(newComponentVariant);
    return { hash: createdObject.hash, object: createdObject };
  },
};


