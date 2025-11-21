// src/api/authApi.ts
import axiosInstance from './axios';
import type { LoginCredentials, RegisterData, AuthResponse, User, ApiResponse } from '../types';

export const authApi = {
  // Register new user
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return response.data.data;
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    return response.data.data;
  },

  // Get current user
  getProfile: async (): Promise<User> => {
    const response = await axiosInstance.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  },
};

// Breaking it down:
// 1. Async/Await Pattern:
// async (data: RegisterData): Promise<AuthResponse> => {
//   const response = await axiosInstance.post(...);
//   return response.data.data;
// }

// async - function returns a Promise
// await - waits for Promise to complete
// Promise<AuthResponse> - tells TypeScript what it returns


// 2. Generic Types in Axios:
// axiosInstance.post<ApiResponse<AuthResponse>>('/auth/register', data)

// Tells TypeScript: "response will be ApiResponse<AuthResponse>"
// Provides autocomplete and type safety