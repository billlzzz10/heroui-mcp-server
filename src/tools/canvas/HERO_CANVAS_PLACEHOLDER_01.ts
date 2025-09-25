import { z } from 'zod';
import { Tool } from '../../server/registry';

export const inputSchema = z.object({
  canvasId: z.string().describe("The ID of the canvas to operate on."),
  action: z.string().describe("The action to perform on the canvas."),
});

export const outputSchema = z.object({
  status: z.string().describe("The status of the canvas operation."),
  details: z.string().optional().describe("Additional details about the operation."),
});

export const HERO_CANVAS_PLACEHOLDER_01: Tool = {
  id: "HERO_CANVAS_PLACEHOLDER_01",
  name: "Canvas Placeholder Tool 01",
  description: "A placeholder tool for canvas operations.",
  inputSchema: inputSchema,
  outputSchema: outputSchema,
  execute: async (input: z.infer<typeof inputSchema>) => {
    console.log(`HERO_CANVAS_PLACEHOLDER_01 executed on canvas ${input.canvasId} with action: ${input.action}`);
    return { status: "success", details: `Action '${input.action}' performed on canvas ${input.canvasId}` };
  },
};


