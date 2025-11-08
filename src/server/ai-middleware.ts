import { FastifyPluginAsync } from 'fastify';
import { RateLimitPluginOptions } from '@fastify/rate-limit';

// Rate limiting configuration for AI services
const AIRateLimitConfig: RateLimitPluginOptions = {
  max: 10, // Max 10 requests
  timeWindow: '1 minute', // per minute
  cache: 10000, // Number of connections to cache
  skipOnError: false, // Do not skip rate limiting on errors
  keyGenerator: (req) => {
    // Use the client's IP address as the rate limit key
    return req.ip;
  },
  errorResponseBuilder: (req, context) => {
    return {
      statusCode: 429,
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Please try again after ${context.after}`,
      timeToReset: context.ttl
    };
  }
};

// Security middleware for AI service calls
const AISecurityMiddleware = {
  /**
   * Validates that the request contains necessary authentication for AI services
   */
  validateAIAuth: (req: any, reply: any, done: any) => {
    // Check if AI service is properly configured
    const openAIApiKey = process.env.OPENAI_API_KEY;
    if (!openAIApiKey || openAIApiKey === 'your_openai_api_key_here') {
      reply.status(500).send({
        error: 'AI service not configured',
        message: 'OpenAI API key not set. Please configure OPENAI_API_KEY environment variable.'
      });
      return;
    }
    
    // Additional security checks can be added here
    done();
  },

  /**
   * Validates the component description for potential security issues
   */
  validateDescription: (description: string): boolean => {
    // Check for potential prompt injection or malicious content
    const dangerousPatterns = [
      /<script/i,
      /javascript:/i,
      /vbscript:/i,
      /on\w+\s*=/i,  // Event handlers like onclick, onload, etc.
      /eval\s*\(/i,
      /setTimeout\s*\(/i,
      /setInterval\s*\(/i
    ];

    return !dangerousPatterns.some(pattern => pattern.test(description));
  }
};

export { AIRateLimitConfig, AISecurityMiddleware };