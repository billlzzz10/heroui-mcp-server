export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? T[K]
    : T[K] extends object
    ? DeepPartial<T[K]>
    : T[K];
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Performs a shallow-clone deep merge where nested plain objects are merged recursively
 * and other values (arrays, primitives) are replaced by the update payload.
 */
export function deepMerge<T>(target: T, updates: DeepPartial<T>): T {
  if (updates === undefined) {
    return target;
  }

  if (!isPlainObject(target) || !isPlainObject(updates)) {
    return updates as T;
  }

  const result: Record<string, unknown> = { ...(target as Record<string, unknown>) };

  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined) {
      continue;
    }

    const existing = result[key];

    if (isPlainObject(existing) && isPlainObject(value)) {
      result[key] = deepMerge(existing, value);
      continue;
    }

    result[key] = value;
  }

  return result as T;
}
