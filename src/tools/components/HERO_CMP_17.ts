// HERO_CMP_17 - MindMap Component
export const HERO_CMP_17 = {
  name: 'mindmap-component',
  description: 'Create interactive mindmap visualization',
  
  createMindMap: async (data: {
    nodes: Array<{
      id: string;
      parentId: string | null;
      title: string;
      content?: string;
      role: 'concept' | 'note' | 'resource' | 'example' | 'task' | 'decision';
    }>;
    layout?: 'tree-right' | 'tree-left' | 'radial' | 'force';
  }) => {
    return {
      id: `mindmap_${Date.now()}`,
      html: generateMindMapHTML(data),
      css: getMindMapCSS(),
      js: getMindMapJS()
    };
  }
};

function generateMindMapHTML(data: any): string {
  return `
    <div class="hero-mindmap" data-layout="${data.layout || 'tree-right'}">
      <svg class="mindmap-canvas" width="100%" height="600">
        ${data.nodes.map(node => `
          <g class="node" data-id="${node.id}" data-role="${node.role}">
            <rect class="node-bg" />
            <text class="node-title">${node.title}</text>
          </g>
        `).join('')}
      </svg>
    </div>
  `;
}
