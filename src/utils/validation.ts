import { z } from 'zod';

export class ValidationError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateInput = <T>(schema: z.ZodSchema<T>, input: unknown): T => {
  try {
    return schema.parse(input);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        'Input validation failed',
        error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
      );
    }
    throw error;
  }
};

export const createResponse = (content: string | object, isError = false) => ({
  content: [{
    type: "text",
    text: isError 
      ? `❌ Error: ${typeof content === 'string' ? content : JSON.stringify(content)}`
      : typeof content === 'string' 
        ? content 
        : JSON.stringify(content, null, 2)
  }]
});

export const handleToolError = (error: unknown) => {
  if (error instanceof ValidationError) {
    return createResponse(`Validation Error: ${error.message}\nDetails: ${error.details?.join(', ')}`, true);
  }
  
  if (error instanceof Error) {
    return createResponse(`Error: ${error.message}`, true);
  }
  
  return createResponse('Unknown error occurred', true);
};
