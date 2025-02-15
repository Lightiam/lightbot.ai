import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock fetch
global.fetch = vi.fn();

// Mock environment variables
vi.mock('../config', () => ({
  config: {
    apiUrl: 'http://localhost:8000'
  }
}));
