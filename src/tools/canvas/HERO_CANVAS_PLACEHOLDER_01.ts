import { z } from 'zod';
import { Tool } from '../../server/registry';
import { crud } from '../../objects/crud';
import {
  LayoutCompositionObjectSchema,
  LayoutCompositionObject,
  ComponentVariantObjectSchema,
  ComponentVariantObject,
} from '../../objects/schemas';

export const inputSchema = z.object({
  layoutHash: z.string().describe('Hash of the layout composition that represents the canvas.'),
});

export const outputSchema = z.object({
  layout: LayoutCompositionObjectSchema.describe('Resolved layout composition object.'),
  components: z.array(ComponentVariantObjectSchema).describe('Flattened list of component variants referenced by the layout slots.'),
});

function collectComponents(layout: LayoutCompositionObject): ComponentVariantObject[] {
  const collected = new Map<string, ComponentVariantObject>();

  const visit = (node: LayoutCompositionObject | ComponentVariantObject) => {
    if (node.objectType === 'component_variant') {
      const result = ComponentVariantObjectSchema.safeParse(node);
      if (result.success) {
        collected.set(result.data.hash, result.data);
      } else {
        throw new Error(`Invalid component_variant found in layout slots: ${result.error.message}`);
      }
      return;
    }

    const layoutResult = LayoutCompositionObjectSchema.safeParse(node);
    if (!layoutResult.success) {
      throw new Error(`Invalid layout_composition nested in slots: ${layoutResult.error.message}`);
    }

    const slotCollections = Object.values(layoutResult.data.slots) as Array<
      Array<ComponentVariantObject | LayoutCompositionObject>
    >;
    slotCollections.forEach((items) => {
      items.forEach((item) => visit(item));
    });
  };

  visit(layout);
  return Array.from(collected.values());
}

export const HERO_CANVAS_PLACEHOLDER_01: Tool = {
  id: 'HERO_CANVAS_PLACEHOLDER_01',
  name: 'Inspect Layout Canvas',
  description: 'Resolves a layout composition hash and returns the layout with all component variants referenced within its slots.',
  inputSchema,
  outputSchema,
  execute: async (input: z.infer<typeof inputSchema>) => {
    const existing = crud.read(input.layoutHash);
    if (!existing) {
      throw new Error(`No MCP object found for hash ${input.layoutHash}`);
    }
    if (existing.objectType !== 'layout_composition') {
      throw new Error(`Object ${input.layoutHash} is a ${existing.objectType}, not a layout_composition.`);
    }

    const validation = LayoutCompositionObjectSchema.safeParse(existing);
    if (!validation.success) {
      throw new Error(`Layout composition failed validation: ${validation.error.message}`);
    }

    const layout = validation.data;
    const components = collectComponents(layout);

    return { layout, components };
  },
};
