import axios, { AxiosError } from 'axios';
import { PredictionResponse } from '../types';

// The backend is currently open, but we set up the interceptor 
// so a bearer token can be dropped in later without refactoring.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://agric-check.onrender.com', // Default until backend is deployed
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  // TODO: Drop in Bearer token here when Auth layer is added
  // const token = localStorage.getItem('token');
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

// Helper to sanitize text inputs to prevent prompt injection 
// or oversized payloads.
const sanitizeValue = (val: string | number) => {
  if (typeof val === 'string') {
    // Trim and limit to 500 characters
    return val.trim().substring(0, 500);
  }
  return val;
};

export const sanitizePayload = (payload: Record<string, any>) => {
  const sanitized: Record<string, any> = {};
  for (const [key, value] of Object.entries(payload)) {
    sanitized[key] = sanitizeValue(value);
  }
  return sanitized;
};

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      return "The connection timed out. The AI took too long to respond. Please try again.";
    }
    if (error.response?.status === 500) {
      return "Our AI hit a snag while processing your request. Please try again.";
    }
    return error.response?.data?.detail || "An unexpected error occurred. Please check your connection and try again.";
  }
  return "An unexpected error occurred. Please try again.";
};

// Generic predict call
export const predict = async (endpoint: string, payload: Record<string, any>): Promise<PredictionResponse> => {
  const response = await apiClient.post<PredictionResponse>(endpoint, sanitizePayload(payload));
  return response.data;
};
