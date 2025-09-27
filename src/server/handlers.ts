import { IncomingMessage, ServerResponse } from 'http';
import { toolRegistry } from './registry';
import { sessionManager } from '../memory/session-manager';

const JSON_CONTENT_TYPE = 'application/json; charset=utf-8';
const MAX_BODY_SIZE = 1024 * 1024; // 1 MB

type JsonRecord = Record<string, unknown>;

function sendJson(res: ServerResponse, statusCode: number, payload: JsonRecord): void {
  if (!res.headersSent) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', JSON_CONTENT_TYPE);
  }
  res.end(JSON.stringify(payload));
}

function sendError(res: ServerResponse, statusCode: number, message: string, details?: unknown): void {
  const errorBody: JsonRecord = { error: message };
  if (details !== undefined) {
    errorBody.details = details;
  }
  sendJson(res, statusCode, errorBody);
}

function getRequestUrl(req: IncomingMessage): URL {
  const host = req.headers.host ?? 'localhost';
  const url = req.url ?? '/';
  return new URL(url, `http://${host}`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseExecutePath(pathname: string): string | null {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 3 && segments[0] === 'tools' && segments[2] === 'execute') {
    return decodeURIComponent(segments[1]);
  }
  return null;
}

function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let total = 0;

    req.on('data', (chunk: Buffer) => {
      total += chunk.length;
      if (total > MAX_BODY_SIZE) {
        reject(new Error('Payload too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      if (chunks.length === 0) {
        resolve(undefined);
        return;
      }

      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw.trim()) {
        resolve(undefined);
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(new Error('Invalid JSON payload'));
      }
    });

    req.on('error', (error) => {
      reject(error);
    });
  });
}

export async function handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const method = req.method ?? 'GET';
    const url = getRequestUrl(req);

    if (method === 'GET' && url.pathname === '/health') {
      sendJson(res, 200, { status: 'ok' });
      return;
    }

    if (method === 'GET' && url.pathname === '/tools') {
      const tools = toolRegistry.getAllTools().map((tool) => ({
        id: tool.id,
        name: tool.name,
        description: tool.description,
      }));
      sendJson(res, 200, { total: tools.length, tools });
      return;
    }

    if (method === 'POST') {
      const toolId = parseExecutePath(url.pathname);
      if (toolId) {
        let payload: unknown;
        try {
          payload = await readJsonBody(req);
        } catch (error) {
          sendError(res, 400, error instanceof Error ? error.message : 'Invalid request body');
          return;
        }

        if (payload !== undefined && !isRecord(payload)) {
          sendError(res, 400, 'Request body must be a JSON object');
          return;
        }

        const body = (payload as Record<string, unknown>) ?? {};
        const sessionId = typeof body.sessionId === 'string' ? body.sessionId : undefined;
        const sessionMetadata = isRecord(body.sessionMetadata) ? (body.sessionMetadata as Record<string, unknown>) : undefined;
        const input = body.input ?? {};

        if (body.sessionId !== undefined && sessionId === undefined) {
          sendError(res, 400, 'sessionId must be a string when provided');
          return;
        }

        let session = sessionId ? sessionManager.getSession(sessionId) : undefined;
        if (sessionId && !session) {
          sendError(res, 404, `Session ${sessionId} was not found`);
          return;
        }

        if (!session) {
          session = sessionManager.createSession(sessionMetadata);
        } else if (sessionMetadata) {
          sessionManager.updateSessionMetadata(session.id, sessionMetadata);
        }

        try {
          const execution = await toolRegistry.executeTool(toolId, input);

          sessionManager.updateSessionContext(session.id, {
            type: 'tool_execution',
            toolId,
            input: execution.input,
            output: execution.output,
            timestamp: new Date().toISOString(),
          });

          sendJson(res, 200, {
            sessionId: session.id,
            tool: {
              id: execution.tool.id,
              name: execution.tool.name,
              description: execution.tool.description,
            },
            input: execution.input,
            output: execution.output,
          });
          return;
        } catch (error) {
          if (error instanceof Error) {
            sendError(res, 400, error.message);
          } else {
            sendError(res, 400, 'Tool execution failed');
          }
          return;
        }
      }
    }

    if (method === 'OPTIONS') {
      res.statusCode = 204;
      res.setHeader('Allow', 'GET,POST,OPTIONS');
      res.end();
      return;
    }

    if (method !== 'GET' && method !== 'POST') {
      res.setHeader('Allow', 'GET,POST,OPTIONS');
      sendError(res, 405, 'Method not allowed');
      return;
    }

    sendError(res, 404, 'Not found');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected server error';
    console.error('Failed to handle request:', error);
    sendError(res, 500, message);
  }
}
