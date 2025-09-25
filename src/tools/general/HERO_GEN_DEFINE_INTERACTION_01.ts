import { z } from 'zod';
import { Tool } from '../../server/registry';
import { InteractionStyleObjectSchema, InteractionStyleObject } from '../../objects/schemas';
import { crud } from '../../objects/crud';

export const inputSchema = z.object({
  name: z.string().optional().describe("Optional name for the interaction style."),
  states: InteractionStyleObjectSchema.shape.states.describe("Defines styles for different interaction states (default, hover, active, focus, disabled)."),
  transitions: InteractionStyleObjectSchema.shape.transitions.describe("Defines transition properties like duration, easing, and affected properties."),
  metadata: InteractionStyleObjectSchema.shape.metadata.omit({ createdAt: true, createdBy: true, usageCount: true }).describe("Additional metadata for the interaction style."),
});

export const outputSchema = z.object({
  hash: z.string().describe("The unique hash of the newly created InteractionStyleObject."),
  object: InteractionStyleObjectSchema.describe("The complete InteractionStyleObject that was created."),
});

export const HERO_GEN_DEFINE_INTERACTION_01: Tool = {
  id: "HERO_GEN_DEFINE_INTERACTION_01",
  name: "Define Interaction Style",
  description: "Defines and stores a new interaction style based on provided specifications.",
  inputSchema: inputSchema,
  outputSchema: outputSchema,
  execute: async (input: z.infer<typeof inputSchema>) => {
    const newInteractionStyle: Omit<InteractionStyleObject, 'hash'> = {
      objectType: "interaction_style",
      name: input.name,
      states: input.states,
      transitions: input.transitions,
      metadata: {
        ...input.metadata,
        createdAt: new Date().toISOString(),
        createdBy: "ai",
        usageCount: 0,
      },
    };

    const createdObject = crud.create(newInteractionStyle);
    return { hash: createdObject.hash, object: createdObject };
  },
};


