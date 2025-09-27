import { z } from 'zod';
import { Tool } from '../../server/registry';
import { crud } from '../../objects/crud';
import { MCPObjectSchema, MCPObject } from '../../objects/schemas';

export const inputSchema = z.object({
  hash: z.string().describe('Hash of the stored MCP object to retrieve.'),
});

export const outputSchema = z.object({
  object: MCPObjectSchema.describe('The MCP object that matches the requested hash.'),
});

export const HERO_GEN_PLACEHOLDER_01: Tool = {
  id: 'HERO_GEN_PLACEHOLDER_01',
  name: 'Fetch MCP Object',
  description: 'Retrieves a previously stored MCP object by its hash and validates it against the union schema.',
  inputSchema,
  outputSchema,
  execute: async (input: z.infer<typeof inputSchema>) => {
    const object = crud.read(input.hash);
    if (!object) {
      throw new Error(`No MCP object found for hash ${input.hash}`);
    }

    const validation = MCPObjectSchema.safeParse(object);
    if (!validation.success) {
      throw new Error(`Stored object failed schema validation: ${validation.error.message}`);
    }

    return { object: validation.data as MCPObject };
  },
};
