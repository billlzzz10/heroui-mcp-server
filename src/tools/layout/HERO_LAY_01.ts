export const HERO_LAY_01 = {
  name: 'create_grid',
  description: 'Create a responsive CSS grid layout with customizable columns and gaps',
  inputSchema: {
    type: 'object',
    properties: {
      columns: {
        type: 'number',
        description: 'Number of grid columns',
        minimum: 1,
        maximum: 12,
        default: 3
      },
      gap: {
        type: 'string',
        enum: ['none', 'small', 'medium', 'large'],
        description: 'Grid gap size',
        default: 'medium'
      },
      responsive: {
        type: 'boolean',
        description: 'Enable responsive breakpoints',
        default: true
      },
      items: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'Grid item contents',
        default: []
      }
    },
    required: []
  },
  execute: async (args: any) => {
    const { columns = 3, gap = 'medium', responsive = true, items = [] } = args;
    
    const gapClasses: Record<string, string> = {
      none: 'gap-0',
      small: 'gap-2',
      medium: 'gap-4',
      large: 'gap-8'
    };
    
    const responsiveClass = responsive 
      ? `grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns}`
      : `grid-cols-${columns}`;
    
    const gridItems = items.length > 0 
      ? items.map((item: string, index: number) => 
          `  <div class="bg-white p-4 rounded-lg shadow">${item}</div>`
        ).join('\n')
      : Array.from({ length: columns }, (_, i) => 
          `  <div class="bg-white p-4 rounded-lg shadow">Item ${i + 1}</div>`
        ).join('\n');
    
    const gridHtml = `<div class="grid ${responsiveClass} ${gapClasses[gap] || gapClasses.medium}">
${gridItems}
</div>`;
    
    return {
      content: [
        {
          type: 'text',
          text: `Grid layout created successfully!\n\nHTML:\n${gridHtml}\n\nColumns: ${columns}\nGap: ${gap}\nResponsive: ${responsive}\nItems: ${items.length || columns}`
        }
      ]
    };
  }
};
