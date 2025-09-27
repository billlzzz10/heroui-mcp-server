import { AddressInfo } from 'net';
import { request } from 'http';
import { startServer } from '../../src/server';
import { crud } from '../../src/objects/crud';
import { sessionManager } from '../../src/memory/session-manager';

describe('HTTP server integration', () => {
  let port: number;
  let stop: (() => Promise<void>) | undefined;

  beforeAll(async () => {
    const server = await startServer(0);
    const address = server.address() as AddressInfo | null;
    if (!address || typeof address.port !== 'number') {
      throw new Error('Failed to obtain listening port');
    }
    port = address.port;
    stop = () =>
      new Promise<void>((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
  });

  afterEach(() => {
    crud.clear();
  });

  afterAll(async () => {
    if (stop) {
      await stop();
    }
    sessionManager.shutdown();
  });

  const sendRequest = <T = unknown>(
    method: string,
    path: string,
    body?: unknown,
  ): Promise<{ status: number; json?: T }> => {
    return new Promise((resolve, reject) => {
      const payload = body === undefined ? undefined : JSON.stringify(body);
      const req = request(
        {
          method,
          hostname: '127.0.0.1',
          port,
          path,
          headers:
            payload === undefined
              ? { Connection: 'close' }
              : {
                  'Content-Type': 'application/json',
                  'Content-Length': Buffer.byteLength(payload),
                  Connection: 'close',
                },
        },
        (res) => {
          const chunks: Buffer[] = [];
          res.on('data', (chunk: Buffer) => chunks.push(chunk));
          res.on('end', () => {
            const raw = Buffer.concat(chunks).toString('utf8');
            let parsed: T | undefined;
            if (raw.trim()) {
              try {
                parsed = JSON.parse(raw);
              } catch (error) {
                reject(error);
                return;
              }
            }
            resolve({ status: res.statusCode ?? 0, json: parsed });
          });
        },
      );

      req.on('error', reject);

      if (payload !== undefined) {
        req.write(payload);
      }

      req.end();
    });
  };

  it('returns health information', async () => {
    const response = await sendRequest('GET', '/health');
    expect(response.status).toBe(200);
    expect(response.json).toEqual({ status: 'ok' });
  });

  it('lists registered tools', async () => {
    const response = await sendRequest<{ total: number; tools: Array<{ id: string }> }>('GET', '/tools');
    expect(response.status).toBe(200);
    const body = response.json!;
    expect(body.total).toBeGreaterThan(0);
    expect(body.tools).toHaveLength(body.total);
  });

  it('executes a tool via HTTP and persists result', async () => {
    const payload = {
      input: {
        name: 'Integration Palette',
        generationMethod: 'manual',
        baseColor: '#112233',
        palette: {
          primary: '#112233',
          secondary: '#445566',
          accent: '#778899',
          neutral: '#ddeeff',
        },
        semantic: {
          background: '#ffffff',
          surface: '#fafafa',
          text: {
            primary: '#111111',
            secondary: '#444444',
            disabled: '#888888',
          },
          border: {
            default: '#cccccc',
            subtle: '#eeeeee',
          },
          feedback: {
            success: '#00ff99',
            warning: '#ffcc00',
            error: '#ff3355',
          },
        },
        metadata: {
          tags: ['integration'],
          suitability: {
            lightMode: true,
            darkMode: false,
            highContrast: true,
          },
        },
      },
    };

    const response = await sendRequest<{ sessionId: string; output: { object: { objectType: string } } }>(
      'POST',
      '/tools/HERO_GEN_DEFINE_COLOR_01/execute',
      payload,
    );

    expect(response.status).toBe(200);
    const body = response.json!;
    expect(body.sessionId).toBeDefined();
    expect(body.output.object.objectType).toBe('color_palette');
    expect(crud.list().length).toBe(1);
  });

  it('rejects invalid payloads with validation errors', async () => {
    const response = await sendRequest('POST', '/tools/HERO_GEN_DEFINE_COLOR_01/execute', {
      input: {
        name: 'Incomplete Palette',
      },
    });

    expect(response.status).toBe(400);
    const body = response.json as Record<string, unknown> | undefined;
    expect(body?.error).toBeDefined();
  });
});
