import { z } from 'zod';
import { Tool } from '../../server/registry';
import { crud } from '../../objects/crud';
import { LayoutCompositionObjectSchema, LayoutCompositionObject } from '../../objects/schemas';

export const inputSchema = z.object({
  hash: z.string().describe('Hash of the layout composition to retrieve.'),
});

export const outputSchema = z.object({
  layout: LayoutCompositionObjectSchema.describe('Validated layout composition object associated with the hash.'),
});

export const HERO_LAYOUT_PLACEHOLDER_01: Tool = {
  id: 'HERO_LAYOUT_PLACEHOLDER_01',
  name: 'Fetch Layout Composition',
  description: 'Loads a stored layout composition from the CRUD store and validates the structure.',
  inputSchema,
  outputSchema,
  execute: async (input: z.infer<typeof inputSchema>) => {
    const existing = crud.read(input.hash);
    if (!existing) {
      throw new Error(`No MCP object found for hash ${input.hash}`);
    }
    if (existing.objectType !== 'layout_composition') {
      throw new Error(`Object ${input.hash} is a ${existing.objectType}, not a layout_composition.`);
    }

    const validation = LayoutCompositionObjectSchema.safeParse(existing);
    if (!validation.success) {
      throw new Error(`Layout composition failed validation: ${validation.error.message}`);
    }

    return { layout: validation.data as LayoutCompositionObject };
  },
};
