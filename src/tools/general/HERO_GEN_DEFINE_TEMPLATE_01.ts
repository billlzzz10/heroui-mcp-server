import { z } from 'zod';
import { Tool } from '../../server/registry';
import { TemplateObjectSchema, TemplateObject } from '../../objects/schemas';
import { crud } from '../../objects/crud';

export const inputSchema = z.object({
  name: z.string().describe("The name of the template."),
  description: z.string().describe("A brief description of the template."),
  templateType: TemplateObjectSchema.shape.templateType.describe("The type of the template (e.g., landing, dashboard)."),
  version: z.string().describe("The version of the template."),
  previewImageUrl: z.string().optional().describe("Optional URL for a preview image of the template."),
  rootLayoutHash: z.string().describe("The hash of the root LayoutCompositionObject for this template."),
  recommendedStyleHashes: TemplateObjectSchema.shape.recommendedStyleHashes.describe("Hashes of recommended style objects for this template."),
  metadata: TemplateObjectSchema.shape.metadata.omit({ createdAt: true, createdBy: true, usageCount: true }).describe("Additional metadata for the template."),
});

export const outputSchema = z.object({
  hash: z.string().describe("The unique hash of the newly created TemplateObject."),
  object: TemplateObjectSchema.describe("The complete TemplateObject that was created."),
});

export const HERO_GEN_DEFINE_TEMPLATE_01: Tool = {
  id: "HERO_GEN_DEFINE_TEMPLATE_01",
  name: "Define Template",
  description: "Defines and stores a new template based on provided specifications.",
  inputSchema: inputSchema,
  outputSchema: outputSchema,
  execute: async (input: z.infer<typeof inputSchema>) => {
    const newTemplate: Omit<TemplateObject, 'hash'> = {
      objectType: "template",
      name: input.name,
      description: input.description,
      templateType: input.templateType,
      version: input.version,
      previewImageUrl: input.previewImageUrl,
      rootLayoutHash: input.rootLayoutHash,
      recommendedStyleHashes: input.recommendedStyleHashes,
      metadata: {
        ...input.metadata,
        createdAt: new Date().toISOString(),
        createdBy: "ai",
        usageCount: 0,
      },
    };

    const createdObject = crud.create(newTemplate);
    return { hash: createdObject.hash, object: createdObject };
  },
};


