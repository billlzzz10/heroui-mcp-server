import { z } from 'zod';
import { Tool } from '../../server/registry';
import { LayoutCompositionObjectSchema, LayoutCompositionObject, ComponentVariantObjectSchema } from '../../objects/schemas';
import { crud } from '../../objects/crud';

export const inputSchema = z.object({
  name: z.string().optional().describe("Optional name for the layout composition."),
  containerType: z.union([z.literal("block"), z.literal("flex"), z.literal("grid")]).describe("The type of container for this layout (block, flex, grid)."),
  containerStyles: z.record(z.string(), z.any()).describe("CSS-like styles applied to the main container."),
  responsiveStyles: z.record(z.string(), z.record(z.string(), z.any())).describe("Responsive styles for different breakpoints."),
  slots: z.record(z.string(), z.array(z.union([z.lazy(() => ComponentVariantObjectSchema), z.lazy(() => LayoutCompositionObjectSchema)]))).describe("Defines content slots within the layout, which can contain components or other layouts."),
  metadata: z.object({
    createdAt: z.string().optional(),
    createdBy: z.union([z.literal("user"), z.literal("ai"), z.literal("system")]).optional(),
    tags: z.array(z.string()).optional(),
    usageCount: z.number().optional(),
  }).partial().describe("Additional metadata for the layout composition."),
});

export const outputSchema = z.object({
  hash: z.string().describe("The unique hash of the newly created LayoutCompositionObject."),
  object: LayoutCompositionObjectSchema.describe("The complete LayoutCompositionObject that was created."),
});

export const HERO_GEN_DEFINE_LAYOUT_01: Tool = {
  id: "HERO_GEN_DEFINE_LAYOUT_01",
  name: "Define Layout Composition",
  description: "Defines and stores a new layout composition based on provided specifications.",
  inputSchema: inputSchema,
  outputSchema: outputSchema,
  execute: async (input: z.infer<typeof inputSchema>) => {
    const newLayoutComposition: Omit<LayoutCompositionObject, 'hash'> = {
      objectType: "layout_composition",
      name: input.name,
      containerType: input.containerType,
      containerStyles: input.containerStyles,
      responsiveStyles: input.responsiveStyles,
      slots: input.slots,
      metadata: {
        ...(input.metadata || {}),
        createdAt: new Date().toISOString(),
        createdBy: "ai",
        usageCount: 0,
      },
    };

    const createdObject = crud.create(newLayoutComposition);
    return { hash: createdObject.hash, object: createdObject };
  },
};


