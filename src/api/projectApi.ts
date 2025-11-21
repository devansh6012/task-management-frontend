import axiosInstance from './axios';
import type { 
  Project, 
  CreateProjectData, 
  UpdateProjectData, 
  ProjectQueryParams,
  ProjectStats,
  ApiResponse,
  PaginationData 
} from '../types';

export const projectApi = {
  // Get all projects
  getProjects: async (params?: ProjectQueryParams): Promise<PaginationData<Project>> => {
    const response = await axiosInstance.get<PaginationData<Project>>('/projects', { params });
    return response.data;
  },

  // Get single project
  getProject: async (id: number): Promise<Project> => {
    const response = await axiosInstance.get<ApiResponse<Project>>(`/projects/${id}`);
    return response.data.data;
  },

  // Create project
  createProject: async (data: CreateProjectData): Promise<Project> => {
    const response = await axiosInstance.post<ApiResponse<Project>>('/projects', data);
    return response.data.data;
  },

  // Update project
  updateProject: async (id: number, data: UpdateProjectData): Promise<Project> => {
    const response = await axiosInstance.put<ApiResponse<Project>>(`/projects/${id}`, data);
    return response.data.data;
  },

  // Delete project
  deleteProject: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/projects/${id}`);
  },

  // Get statistics
  getStats: async (): Promise<ProjectStats> => {
    const response = await axiosInstance.get<ApiResponse<ProjectStats>>('/projects/stats');
    return response.data.data;
  },
};