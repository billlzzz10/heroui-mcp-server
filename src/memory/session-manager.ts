import { v4 as uuidv4 } from 'uuid';

export interface Session {
  id: string;
  createdAt: Date;
  lastAccessed: Date;
  context: any[]; // Stores interaction history, tool outputs, etc.
  metadata: Record<string, any>;
}

class SessionManager {
  private sessions: Map<string, Session> = new Map();
  private MAX_SESSION_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

  constructor() {
    // Periodically clean up old sessions
    setInterval(() => this.cleanupOldSessions(), 60 * 60 * 1000); // Every hour
  }

  createSession(initialMetadata?: Record<string, any>): Session {
    const id = uuidv4();
    const newSession: Session = {
      id,
      createdAt: new Date(),
      lastAccessed: new Date(),
      context: [],
      metadata: initialMetadata || {},
    };
    this.sessions.set(id, newSession);
    return newSession;
  }

  getSession(id: string): Session | undefined {
    const session = this.sessions.get(id);
    if (session) {
      session.lastAccessed = new Date(); // Update last accessed time
    }
    return session;
  }

  updateSessionContext(id: string, newContextEntry: any): boolean {
    const session = this.getSession(id);
    if (session) {
      session.context.push(newContextEntry);
      return true;
    }
    return false;
  }

  updateSessionMetadata(id: string, metadataUpdates: Partial<Record<string, any>>): boolean {
    const session = this.getSession(id);
    if (session) {
      session.metadata = { ...session.metadata, ...metadataUpdates };
      return true;
    }
    return false;
  }

  deleteSession(id: string): boolean {
    return this.sessions.delete(id);
  }

  private cleanupOldSessions(): void {
    const now = new Date().getTime();
    this.sessions.forEach((session, id) => {
      if (now - session.lastAccessed.getTime() > this.MAX_SESSION_AGE_MS) {
        console.log(`Cleaning up old session: ${id}`);
        this.sessions.delete(id);
      }
    });
  }
}

export const sessionManager = new SessionManager();


