// Test setup file
// Global test configuration and mocks

// Mock console methods for cleaner test output
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Setup test environment
beforeEach(() => {
  jest.clearAllMocks();
});
