import { z } from 'zod';
import { Tool } from '../../server/registry';
import { crud } from '../../objects/crud';
import {
  TemplateObjectSchema,
  TemplateObject,
  LayoutCompositionObjectSchema,
  LayoutCompositionObject,
  ComponentVariantObjectSchema,
  ComponentVariantObject,
} from '../../objects/schemas';

export const inputSchema = z.object({
  templateHash: z.string().describe('Hash of the template to analyse.'),
  includeLayouts: z.boolean().optional().describe('Include resolved layout compositions in the response (default: true).'),
  includeComponents: z.boolean().optional().describe('Include resolved component variants in the response (default: true).'),
});

const styleDependencySchema = z.object({
  kind: z.string().describe('Type of style dependency (e.g., color, typography).'),
  hash: z.string().describe('Hash reference to the style object.'),
});

export const outputSchema = z.object({
  template: TemplateObjectSchema.describe('The template object that was analysed.'),
  layouts: z.array(LayoutCompositionObjectSchema).describe('Unique layout compositions referenced by the template.'),
  components: z.array(ComponentVariantObjectSchema).describe('Unique component variants referenced by the template layouts.'),
  styleDependencies: z.array(styleDependencySchema).describe('Style object hashes the template recommends.'),
});

function fetchTemplate(hash: string): TemplateObject {
  const object = crud.read(hash);
  if (!object) {
    throw new Error(`Template ${hash} was not found`);
  }
  if (object.objectType !== 'template') {
    throw new Error(`Object ${hash} is ${object.objectType}, expected template`);
  }
  const validation = TemplateObjectSchema.safeParse(object);
  if (!validation.success) {
    throw new Error(`Template ${hash} failed validation: ${validation.error.message}`);
  }
  return validation.data;
}

function fetchLayout(hash: string): LayoutCompositionObject {
  const object = crud.read(hash);
  if (!object) {
    throw new Error(`Layout composition ${hash} was not found`);
  }
  if (object.objectType !== 'layout_composition') {
    throw new Error(`Object ${hash} is ${object.objectType}, expected layout_composition`);
  }
  const validation = LayoutCompositionObjectSchema.safeParse(object);
  if (!validation.success) {
    throw new Error(`Layout composition ${hash} failed validation: ${validation.error.message}`);
  }
  return validation.data;
}

function collectLayouts(root: LayoutCompositionObject): LayoutCompositionObject[] {
  const visited = new Map<string, LayoutCompositionObject>();

  const visit = (layout: LayoutCompositionObject) => {
    if (visited.has(layout.hash)) {
      return;
    }
    visited.set(layout.hash, layout);

    const slotCollections = Object.values(layout.slots) as Array<
      Array<ComponentVariantObject | LayoutCompositionObject>
    >;

    slotCollections.forEach((items) => {
      items.forEach((item) => {
        if (item.objectType === 'layout_composition') {
          const result = LayoutCompositionObjectSchema.safeParse(item);
          if (!result.success) {
            throw new Error(`Nested layout failed validation: ${result.error.message}`);
          }
          visit(result.data);
        }
      });
    });
  };

  visit(root);
  return Array.from(visited.values());
}

function collectComponents(layouts: LayoutCompositionObject[]): ComponentVariantObject[] {
  const collected = new Map<string, ComponentVariantObject>();

  const visitLayout = (layout: LayoutCompositionObject) => {
    const slotCollections = Object.values(layout.slots) as Array<
      Array<ComponentVariantObject | LayoutCompositionObject>
    >;

    slotCollections.forEach((items) => {
      items.forEach((item) => {
        if (item.objectType === 'component_variant') {
          const result = ComponentVariantObjectSchema.safeParse(item);
          if (!result.success) {
            throw new Error(`Component variant in layout failed validation: ${result.error.message}`);
          }
          collected.set(result.data.hash, result.data);
        } else if (item.objectType === 'layout_composition') {
          visitLayout(item);
        }
      });
    });
  };

  layouts.forEach((layout) => visitLayout(layout));
  return Array.from(collected.values());
}

export const HERO_ADV_PLACEHOLDER_01: Tool = {
  id: 'HERO_ADV_PLACEHOLDER_01',
  name: 'Analyse Template Dependencies',
  description: 'Inspects a template and reports its layout, component, and style dependencies using validated MCP object schemas.',
  inputSchema,
  outputSchema,
  execute: async (input: z.infer<typeof inputSchema>) => {
    const template = fetchTemplate(input.templateHash);
    const includeLayouts = input.includeLayouts ?? true;
    const includeComponents = input.includeComponents ?? true;

    const rootLayout = fetchLayout(template.rootLayoutHash);
    const layouts = includeLayouts ? collectLayouts(rootLayout) : [];
    const components = includeComponents ? collectComponents(includeLayouts ? layouts : [rootLayout]) : [];

    const styleDependencies = Object.entries(template.recommendedStyleHashes).map(([kind, hash]) => ({
      kind,
      hash,
    }));

    return {
      template,
      layouts,
      components,
      styleDependencies,
    };
  },
};
