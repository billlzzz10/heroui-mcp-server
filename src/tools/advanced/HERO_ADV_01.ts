export const HERO_ADV_01 = {
  name: 'parse_markdown',
  description: 'Parse Markdown content and convert to structured outline format',
  inputSchema: {
    type: 'object',
    properties: {
      markdown: {
        type: 'string',
        description: 'Markdown content to parse'
      },
      format: {
        type: 'string',
        enum: ['outline', 'json', 'html'],
        description: 'Output format',
        default: 'outline'
      }
    },
    required: ['markdown']
  },
  execute: async (args: any) => {
    const { markdown, format = 'outline' } = args;
    
    // Simple markdown parser
    const lines = markdown.split('\n');
    const outline: any[] = [];
    
    lines.forEach((line: string) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      
      // Headers
      if (trimmed.startsWith('#')) {
        const level = trimmed.match(/^#+/)?.[0].length || 1;
        const title = trimmed.replace(/^#+\s*/, '');
        outline.push({
          type: 'header',
          level,
          title,
          id: title.toLowerCase().replace(/\s+/g, '-')
        });
      }
      // Lists
      else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const content = trimmed.replace(/^[-*]\s*/, '');
        const isChecked = content.startsWith('[x]');
        const isUnchecked = content.startsWith('[ ]');
        
        outline.push({
          type: 'list',
          content: content.replace(/^\[[ x]\]\s*/, ''),
          checked: isChecked ? true : isUnchecked ? false : null
        });
      }
      // Regular text
      else {
        outline.push({
          type: 'text',
          content: trimmed
        });
      }
    });
    
    let result = '';
    
    if (format === 'json') {
      result = JSON.stringify(outline, null, 2);
    } else if (format === 'html') {
      result = outline.map(item => {
        switch (item.type) {
          case 'header':
            return `<h${item.level} id="${item.id}">${item.title}</h${item.level}>`;
          case 'list':
            const checkbox = item.checked !== null 
              ? `<input type="checkbox" ${item.checked ? 'checked' : ''}> `
              : '';
            return `<li>${checkbox}${item.content}</li>`;
          case 'text':
            return `<p>${item.content}</p>`;
          default:
            return '';
        }
      }).join('\n');
    } else {
      result = outline.map(item => {
        switch (item.type) {
          case 'header':
            return `${'  '.repeat(item.level - 1)}${item.title}`;
          case 'list':
            const status = item.checked === true ? '[x]' : item.checked === false ? '[ ]' : '-';
            return `  ${status} ${item.content}`;
          case 'text':
            return item.content;
          default:
            return '';
        }
      }).join('\n');
    }
    
    return {
      content: [
        {
          type: 'text',
          text: `Markdown parsed successfully!\n\nFormat: ${format}\nItems: ${outline.length}\n\nResult:\n${result}`
        }
      ]
    };
  }
};
