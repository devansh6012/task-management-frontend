import axiosInstance from './axios';
import type { 
  Task, 
  CreateTaskData, 
  UpdateTaskData, 
  TaskQueryParams,
  TaskStats,
  ApiResponse,
  PaginationData 
} from '../types';

export const taskApi = {
  // Get all tasks
  getTasks: async (params?: TaskQueryParams): Promise<PaginationData<Task>> => {
    const response = await axiosInstance.get<PaginationData<Task>>('/tasks', { params });
    return response.data;
  },

  // Get my tasks
  getMyTasks: async (params?: TaskQueryParams): Promise<PaginationData<Task>> => {
    const response = await axiosInstance.get<PaginationData<Task>>('/tasks/my-tasks', { params });
    return response.data;
  },

  // Get single task
  getTask: async (id: number): Promise<Task> => {
    const response = await axiosInstance.get<ApiResponse<Task>>(`/tasks/${id}`);
    return response.data.data;
  },

  // Create task
  createTask: async (data: CreateTaskData): Promise<Task> => {
    const response = await axiosInstance.post<ApiResponse<Task>>('/tasks', data);
    return response.data.data;
  },

  // Update task
  updateTask: async (id: number, data: UpdateTaskData): Promise<Task> => {
    const response = await axiosInstance.put<ApiResponse<Task>>(`/tasks/${id}`, data);
    return response.data.data;
  },

  // Delete task
  deleteTask: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/tasks/${id}`);
  },

  // Get statistics
  getStats: async (): Promise<TaskStats> => {
    const response = await axiosInstance.get<ApiResponse<TaskStats>>('/tasks/stats');
    return response.data.data;
  },
};