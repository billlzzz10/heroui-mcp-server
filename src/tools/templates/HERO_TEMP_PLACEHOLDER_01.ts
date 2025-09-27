import { z } from 'zod';
import { Tool } from '../../server/registry';
import { crud } from '../../objects/crud';
import { TemplateObjectSchema, TemplateObject } from '../../objects/schemas';

export const inputSchema = z.object({
  hash: z.string().describe('Hash of the template object to retrieve.'),
});

export const outputSchema = z.object({
  template: TemplateObjectSchema.describe('The template object stored under the provided hash.'),
});

export const HERO_TEMP_PLACEHOLDER_01: Tool = {
  id: 'HERO_TEMP_PLACEHOLDER_01',
  name: 'Fetch Template',
  description: 'Retrieves a stored template definition, including recommended style hashes and metadata.',
  inputSchema,
  outputSchema,
  execute: async (input: z.infer<typeof inputSchema>) => {
    const existing = crud.read(input.hash);
    if (!existing) {
      throw new Error(`No MCP object found for hash ${input.hash}`);
    }
    if (existing.objectType !== 'template') {
      throw new Error(`Object ${input.hash} is a ${existing.objectType}, not a template.`);
    }

    const validation = TemplateObjectSchema.safeParse(existing);
    if (!validation.success) {
      throw new Error(`Template failed validation: ${validation.error.message}`);
    }

    return { template: validation.data as TemplateObject };
  },
};
