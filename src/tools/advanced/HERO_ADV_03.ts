import { LearningSystem } from '../../utils/learning-system.js';

const learningSystem = new LearningSystem();

export const HERO_ADV_03 = {
  name: 'provide_feedback',
  description: 'ให้ feedback สำหรับผลลัพธ์ที่ได้ เพื่อปรับปรุงระบบ',
  inputSchema: {
    type: 'object',
    properties: {
      sessionId: {
        type: 'string',
        description: 'Session ID',
        default: 'default'
      },
      toolName: {
        type: 'string',
        description: 'ชื่อ tool ที่ให้ feedback'
      },
      feedback: {
        type: 'string',
        enum: ['positive', 'negative', 'neutral'],
        description: 'ประเภท feedback'
      },
      comment: {
        type: 'string',
        description: 'ความคิดเห็นเพิ่มเติม (optional)'
      },
      suggestion: {
        type: 'string',
        description: 'ข้อเสนอแนะสำหรับการปรับปรุง (optional)'
      }
    },
    required: ['toolName', 'feedback']
  },
  execute: async (args: any) => {
    try {
      const { sessionId = 'default', toolName, feedback, comment, suggestion } = args;
      
      // Log feedback
      await learningSystem.logUsage({
        timestamp: new Date().toISOString(),
        toolName: 'provide_feedback',
        input: args,
        output: { feedback_recorded: true },
        success: true,
        feedback: feedback as any,
        sessionId
      });

      // Get recent history to update
      const history = await learningSystem.getConversationHistory(sessionId);
      const recentTool = history
        .filter(h => h.toolName === toolName)
        .pop();

      if (recentTool) {
        // Update the recent tool usage with feedback
        recentTool.feedback = feedback as any;
        
        // Re-log with feedback
        await learningSystem.logUsage({
          ...recentTool,
          feedback: feedback as any
        });
      }

      return {
        content: [{
          type: 'text',
          text: `✅ Feedback บันทึกแล้ว!

🎯 Tool: ${toolName}
📊 Feedback: ${feedback}
${comment ? `💬 ความคิดเห็น: ${comment}` : ''}
${suggestion ? `💡 ข้อเสนอแนะ: ${suggestion}` : ''}

🤖 ระบบจะใช้ feedback นี้เพื่อปรับปรุงการทำงานในอนาคต

📈 สถิติ feedback ล่าสุด:
- Positive: ${history.filter(h => h.feedback === 'positive').length}
- Negative: ${history.filter(h => h.feedback === 'negative').length}
- Neutral: ${history.filter(h => h.feedback === 'neutral').length}`
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
