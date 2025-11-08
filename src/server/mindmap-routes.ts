// MindMap API Routes based on CANNON-MINDMAP spec
import { FastifyInstance } from 'fastify';

export async function mindmapRoutes(fastify: FastifyInstance) {
  
  // GET /tools - List available tools
  fastify.get('/tools', async (request, reply) => {
    return {
      tools: [
        {
          name: 'markdown.parse',
          description: 'Parse Markdown to Outline',
          inputSchemaRef: '#/components/schemas/MarkdownInput',
          outputSchemaRef: '#/components/schemas/CanonicalOutline'
        },
        {
          name: 'convert.outlineToMindmap',
          description: 'Convert Outline to MindMap',
          inputSchemaRef: '#/components/schemas/CanonicalOutline',
          outputSchemaRef: '#/components/schemas/CanonicalMindMap'
        }
      ]
    };
  });

  // POST /markdown/parse - Parse Markdown to Outline
  fastify.post('/markdown/parse', async (request, reply) => {
    const { markdown } = request.body as { markdown: string };
    
    // Use HERO_ADV_12 to parse
    const outline = await parseMarkdownToOutline(markdown);
    
    return outline;
  });

  // POST /convert - Transform between formats
  fastify.post('/convert', async (request, reply) => {
    const { fromFormat, toFormat, payload } = request.body as any;
    
    if (fromFormat === 'outline' && toFormat === 'mindmap') {
      const mindmap = convertOutlineToMindMap(payload);
      return {
        format: 'mindmap',
        result: mindmap
      };
    }
    
    if (fromFormat === 'mindmap' && toFormat === 'outline') {
      const outline = convertMindMapToOutline(payload);
      return {
        format: 'outline', 
        result: outline
      };
    }
    
    throw new Error('Unsupported conversion');
  });

  // GET /maps - List mindmaps
  fastify.get('/maps', async (request, reply) => {
    // Return stored mindmaps
    return { maps: [] };
  });

  // POST /maps - Create mindmap
  fastify.post('/maps', async (request, reply) => {
    const mindmap = request.body;
    const mapId = generateId();
    
    // Store mindmap
    // await storeMindMap(mapId, mindmap);
    
    return { mapId, map: mindmap };
  });
}

function parseMarkdownToOutline(markdown: string) {
  // Implementation from HERO_ADV_12
  return {};
}

function convertOutlineToMindMap(outline: any) {
  const nodes = [];
  
  // Convert sections to nodes
  outline.sections?.forEach((section: any, index: number) => {
    nodes.push({
      id: section.id,
      parentId: null,
      order: index,
      title: section.title,
      content: section.content,
      role: 'concept'
    });
    
    // Convert bullets to child nodes
    section.bullets?.forEach((bullet: any, bulletIndex: number) => {
      nodes.push({
        id: bullet.id,
        parentId: section.id,
        order: bulletIndex,
        title: bullet.content,
        role: bullet.role || 'example'
      });
    });
  });
  
  return {
    id: outline.id,
    title: outline.title,
    meta: {
      sourceFormat: 'mindmap',
      ruleVersion: 'v1.0.0'
    },
    nodes,
    relations: []
  };
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
