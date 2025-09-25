import { Session } from './session-manager';

/**
 * Trims the session context based on a maximum token limit.
 * This is a more realistic implementation that simulates tokenization
 * and prioritizes recent entries.
 * @param session The session object to trim.
 * @param maxTokens The maximum number of tokens allowed in the context.
 * @returns The trimmed context.
 */
export function trimContext(session: Session, maxTokens: number): any[] {
  // In a real-world scenario, this would involve:
  // 1. Tokenizing the context entries using a proper tokenizer (e.g., for LLMs).
  // 2. Calculating the token count for each entry.
  // 3. Prioritizing and removing less important entries until maxTokens is met.

  if (session.context.length === 0) {
    return [];
  }

  let currentTokenCount = 0;
  const trimmedContext: any[] = [];

  // Simulate token counting: a simple approach for demonstration.
  // In production, use a library like `tiktoken` or a custom tokenizer.
  const getTokenCount = (entry: any): number => {
    if (typeof entry === 'string') {
      return Math.ceil(entry.length / 4); // Rough estimate: 1 token per 4 characters
    } else if (typeof entry === 'object' && entry !== null) {
      return Math.ceil(JSON.stringify(entry).length / 4);
    }
    return 1; // Default for other types
  };

  // Iterate from the most recent entries backwards to prioritize them
  for (let i = session.context.length - 1; i >= 0; i--) {
    const entry = session.context[i];
    const entryTokenCount = getTokenCount(entry);

    if (currentTokenCount + entryTokenCount <= maxTokens) {
      trimmedContext.unshift(entry); // Add to the beginning to maintain original order
      currentTokenCount += entryTokenCount;
    } else {
      // If adding this entry exceeds maxTokens, we stop or try to partially add it.
      // For simplicity, we stop here. A more advanced trimmer might summarize the oldest entry.
      break;
    }
  }

  return trimmedContext;
}


