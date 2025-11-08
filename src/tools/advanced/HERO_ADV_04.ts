import { LearningSystem } from '../../utils/learning-system.js';

const learningSystem = new LearningSystem();

export const HERO_ADV_04 = {
  name: 'get_smart_suggestions',
  description: 'ได้รับคำแนะนำอัจฉริยะจากการเรียนรู้การใช้งานก่อนหน้า',
  inputSchema: {
    type: 'object',
    properties: {
      context: {
        type: 'string',
        description: 'บริบทหรือสิ่งที่ต้องการสร้าง'
      },
      toolType: {
        type: 'string',
        description: 'ประเภท tool ที่สนใจ (optional)'
      },
      sessionId: {
        type: 'string',
        description: 'Session ID',
        default: 'default'
      }
    },
    required: ['context']
  },
  execute: async (args: any) => {
    try {
      const { context, toolType, sessionId = 'default' } = args;
      
      // Get conversation history
      const history = await learningSystem.getConversationHistory(sessionId);
      
      // Get similar templates
      const similarTemplates = await learningSystem.getSimilarTemplates({ context, toolType });
      
      // Analyze patterns
      const toolUsage = history.reduce((acc, log) => {
        acc[log.toolName] = (acc[log.toolName] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const successfulTools = history
        .filter(h => h.success && h.feedback !== 'negative')
        .map(h => h.toolName);

      const recommendations = [];

      // Based on context
      if (context.includes('button') || context.includes('ปุ่ม')) {
        recommendations.push({
          tool: 'create_button',
          reason: 'ตรวจพบคำว่า "button" ในบริบท',
          confidence: 0.9
        });
      }

      if (context.includes('form') || context.includes('ฟอร์ม')) {
        recommendations.push({
          tool: 'generate_form',
          reason: 'ตรวจพบคำว่า "form" ในบริบท',
          confidence: 0.85
        });
      }

      if (context.includes('layout') || context.includes('เลย์เอาต์')) {
        recommendations.push({
          tool: 'create_grid',
          reason: 'ตรวจพบคำว่า "layout" ในบริบท',
          confidence: 0.8
        });
      }

      // Based on usage patterns
      const mostUsedTool = Object.entries(toolUsage)
        .sort(([,a], [,b]) => b - a)[0];

      if (mostUsedTool) {
        recommendations.push({
          tool: mostUsedTool[0],
          reason: `Tool ที่ใช้บ่อยที่สุด (${mostUsedTool[1]} ครั้ง)`,
          confidence: 0.7
        });
      }

      // Based on templates
      similarTemplates.forEach(template => {
        recommendations.push({
          tool: 'template_based',
          reason: `พบ template คล้ายกัน (success rate: ${(template.success_rate * 100).toFixed(1)}%)`,
          confidence: template.success_rate,
          template: template.pattern
        } as any);
      });

      return {
        content: [{
          type: 'text',
          text: `🤖 คำแนะนำอัจฉริยะ

📝 บริบท: "${context}"

🎯 คำแนะนำ:
${recommendations.map((rec: any, i) => 
  `${i + 1}. **${rec.tool}** (${(rec.confidence * 100).toFixed(1)}%)
   └─ ${rec.reason}${rec.template ? `\n   └─ Pattern: ${rec.template}` : ''}`
).join('\n\n')}

📊 สถิติการใช้งาน:
${Object.entries(toolUsage)
  .sort(([,a], [,b]) => b - a)
  .slice(0, 5)
  .map(([tool, count]) => `- ${tool}: ${count} ครั้ง`)
  .join('\n')}

✅ Tools ที่ประสบความสำเร็จ:
${[...new Set(successfulTools)].slice(0, 5).map(tool => `- ${tool}`).join('\n')}

💡 เคล็ดลับ: ใช้ provide_feedback เพื่อช่วยระบบเรียนรู้และให้คำแนะนำที่ดีขึ้น!`
        }]
      };
    } catch (error: any) {
      return {
        content: [{
          type: 'text',
          text: `❌ Error: ${error?.message || 'Unknown error'}`
        }]
      };
    }
  }
};
