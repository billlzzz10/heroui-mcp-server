import fs from 'fs/promises';
import path from 'path';

interface UsageLog {
  timestamp: string;
  toolName: string;
  input: any;
  output: any;
  success: boolean;
  feedback?: 'positive' | 'negative' | 'neutral';
  sessionId: string;
}

interface Template {
  id: string;
  pattern: string;
  usage_count: number;
  success_rate: number;
  last_used: string;
  variations: any[];
}

export class LearningSystem {
  private logPath = 'data/logs/usage.jsonl';
  private templatesPath = 'data/templates/learned.json';

  async logUsage(log: UsageLog): Promise<void> {
    try {
      await fs.mkdir(path.dirname(this.logPath), { recursive: true });
      const logLine = JSON.stringify(log) + '\n';
      await fs.appendFile(this.logPath, logLine);
    } catch (error) {
      console.error('Failed to log usage:', error);
    }
  }

  async extractTemplate(input: any, output: any): Promise<Template> {
    const pattern = this.generatePattern(input);
    const template: Template = {
      id: this.generateId(pattern),
      pattern,
      usage_count: 1,
      success_rate: 1.0,
      last_used: new Date().toISOString(),
      variations: [{ input, output }]
    };
    
    await this.saveTemplate(template);
    return template;
  }

  async getConversationHistory(sessionId: string): Promise<UsageLog[]> {
    try {
      const content = await fs.readFile(this.logPath, 'utf-8');
      const logs = content.split('\n')
        .filter(line => line.trim())
        .map(line => JSON.parse(line))
        .filter(log => log.sessionId === sessionId);
      
      return logs;
    } catch (error) {
      return [];
    }
  }

  async getSimilarTemplates(input: any): Promise<Template[]> {
    try {
      const content = await fs.readFile(this.templatesPath, 'utf-8');
      const templates: Template[] = JSON.parse(content);
      
      // Simple similarity matching
      const pattern = this.generatePattern(input);
      return templates
        .filter(t => this.calculateSimilarity(t.pattern, pattern) > 0.7)
        .sort((a, b) => b.success_rate - a.success_rate);
    } catch (error) {
      return [];
    }
  }

  private generatePattern(input: any): string {
    // Extract key patterns from input
    const keys = Object.keys(input).sort();
    const types = keys.map(key => `${key}:${typeof input[key]}`);
    return types.join('|');
  }

  private generateId(pattern: string): string {
    return Buffer.from(pattern).toString('base64').slice(0, 8);
  }

  private calculateSimilarity(pattern1: string, pattern2: string): number {
    const set1 = new Set(pattern1.split('|'));
    const set2 = new Set(pattern2.split('|'));
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
  }

  private async saveTemplate(template: Template): Promise<void> {
    try {
      await fs.mkdir(path.dirname(this.templatesPath), { recursive: true });
      
      let templates: Template[] = [];
      try {
        const content = await fs.readFile(this.templatesPath, 'utf-8');
        templates = JSON.parse(content);
      } catch (error) {
        // File doesn't exist, start with empty array
      }

      const existingIndex = templates.findIndex(t => t.id === template.id);
      if (existingIndex >= 0) {
        // Update existing template
        templates[existingIndex].usage_count++;
        templates[existingIndex].last_used = template.last_used;
        templates[existingIndex].variations.push(...template.variations);
      } else {
        // Add new template
        templates.push(template);
      }

      await fs.writeFile(this.templatesPath, JSON.stringify(templates, null, 2));
    } catch (error) {
      console.error('Failed to save template:', error);
    }
  }
}
