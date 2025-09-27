import { z } from 'zod';
import { Tool } from '../../server/registry';
import { crud } from '../../objects/crud';
import { ComponentVariantObjectSchema, ComponentVariantObject } from '../../objects/schemas';

const metadataUpdateSchema = z.object({
  createdAt: z.string().optional(),
  createdBy: z.union([z.literal('user'), z.literal('ai'), z.literal('system')]).optional(),
  tags: z.array(z.string()).optional(),
  usageCount: z.number().optional(),
  successScore: z.number().optional(),
});

export const inputSchema = z.object({
  hash: z.string().describe('Hash of the component variant to retrieve or update.'),
  metadata: metadataUpdateSchema.optional().describe('Optional metadata overrides to merge into the component variant.'),
  incrementUsage: z.boolean().optional().describe('Increment usageCount by 1 before applying metadata overrides.'),
});

export const outputSchema = z.object({
  component: ComponentVariantObjectSchema.describe('The resolved component variant object after optional updates.'),
});

export const HERO_COMP_PLACEHOLDER_01: Tool = {
  id: 'HERO_COMP_PLACEHOLDER_01',
  name: 'Inspect Component Variant',
  description: 'Retrieves a stored component variant and optionally updates its metadata to keep usage metrics in sync.',
  inputSchema,
  outputSchema,
  execute: async (input: z.infer<typeof inputSchema>) => {
    const existing = crud.read(input.hash);
    if (!existing) {
      throw new Error(`No MCP object found for hash ${input.hash}`);
    }
    if (existing.objectType !== 'component_variant') {
      throw new Error(`Object ${input.hash} is a ${existing.objectType}, not a component_variant.`);
    }

    let component = existing as ComponentVariantObject;

    const metadataUpdates: Partial<ComponentVariantObject['metadata']> = {};
    if (input.incrementUsage) {
      metadataUpdates.usageCount = component.metadata.usageCount + 1;
    }
    if (input.metadata) {
      Object.assign(metadataUpdates, input.metadata);
    }

    if (Object.keys(metadataUpdates).length > 0) {
      const updated = crud.update(input.hash, { metadata: metadataUpdates });
      if (!updated) {
        throw new Error(`Unable to update component variant ${input.hash}`);
      }
      component = updated as ComponentVariantObject;
    }

    const validation = ComponentVariantObjectSchema.safeParse(component);
    if (!validation.success) {
      throw new Error(`Component variant failed validation: ${validation.error.message}`);
    }

    return { component: validation.data };
  },
};
