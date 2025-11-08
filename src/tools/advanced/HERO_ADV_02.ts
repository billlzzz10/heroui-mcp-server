import { LearningSystem } from '../../utils/learning-system.js';

const learningSystem = new LearningSystem();

export const HERO_ADV_02 = {
  name: 'get_conversation_history',
  description: 'ดึงข้อมูลประวัติการสนทนาและการใช้งาน tools',
  inputSchema: {
    type: 'object',
    properties: {
      sessionId: {
        type: 'string',
        description: 'Session ID สำหรับดึงประวัติ (ถ้าไม่ระบุจะใช้ current session)'
      },
      limit: {
        type: 'number',
        description: 'จำนวนรายการที่ต้องการ (default: 10)',
        default: 10
      },
      toolName: {
        type: 'string',
        description: 'กรองตาม tool name (optional)'
      }
    },
    required: []
  },
  execute: async (args: any) => {
    try {
      const { sessionId = 'default', limit = 10, toolName } = args;
      
      let history = await learningSystem.getConversationHistory(sessionId);
      
      if (toolName) {
        history = history.filter(log => log.toolName === toolName);
      }
      
      history = history.slice(-limit);
      
      const summary = {
        total_interactions: history.length,
        tools_used: [...new Set(history.map(h => h.toolName))],
        success_rate: history.length > 0 ? 
          history.filter(h => h.success).length / history.length : 0,
        recent_activity: history.map(h => ({
          timestamp: h.timestamp,
          tool: h.toolName,
          success: h.success,
          feedback: h.feedback
        }))
      };

      return {
        content: [{
          type: 'text',
          text: `📊 ประวัติการสนทนา (Session: ${sessionId})

📈 สถิติ:
- การใช้งานทั้งหมด: ${summary.total_interactions}
- Tools ที่ใช้: ${summary.tools_used.join(', ')}
- อัตราความสำเร็จ: ${(summary.success_rate * 100).toFixed(1)}%

🕒 กิจกรรมล่าสุด:
${summary.recent_activity.map(a => 
  `- ${a.timestamp}: ${a.tool} ${a.success ? '✅' : '❌'} ${a.feedback ? `(${a.feedback})` : ''}`
).join('\n')}

💾 ข้อมูลเต็ม: ${JSON.stringify(history, null, 2)}`
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
