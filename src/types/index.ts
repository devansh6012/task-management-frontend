// User types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
}

// Project types
export interface Project {
  id: number;
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  startDate?: string;
  endDate?: string;
  ownerId: number;
  owner?: User;
  tasks?: Task[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  name: string;
  description?: string;
  status?: 'active' | 'completed' | 'on-hold' | 'cancelled';
  startDate?: string;
  endDate?: string;
}

export interface UpdateProjectData extends Partial<CreateProjectData> {}

// What are Utility Types?
// TypeScript provides built-in "helper types" that transform existing types. They're like tools in a toolbox.

// Partial<T> - Make All Properties Optional
// // Original type
// interface CreateProjectData {
//   name: string;
//   description?: string;
//   status?: 'active' | 'completed' | 'on-hold' | 'cancelled';
//   startDate?: string;
//   endDate?: string;
// }

// // When you update a project, you might only update some fields
// export interface UpdateProjectData extends Partial<CreateProjectData> {}
// What does Partial<CreateProjectData> create?
// // Equivalent to:
// interface UpdateProjectData {
//   name?: string;              // Now optional!
//   description?: string;
//   status?: 'active' | 'completed' | 'on-hold' | 'cancelled';
//   startDate?: string;
//   endDate?: string;
// }


// Task types
export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  projectId: number;
  project?: Project;
  assignedTo?: number;
  assignee?: User;
  createdBy: number;
  creator?: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  status?: 'todo' | 'in-progress' | 'review' | 'done';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  projectId: number;
  assignedTo?: number;
}

export interface UpdateTaskData extends Partial<Omit<CreateTaskData, 'projectId'>> {}

// Omit<T, K> - Remove Specific Properties
// export interface UpdateTaskData extends Partial<Omit<CreateTaskData, 'projectId'>> {}
// Let's break this down step by step:

// Step 1: Original CreateTaskData
// interface CreateTaskData {
//   title: string;
//   description?: string;
//   status?: 'todo' | 'in-progress' | 'review' | 'done';
//   priority?: 'low' | 'medium' | 'high' | 'urgent';
//   dueDate?: string;
//   projectId: number;      // ← We want to remove this
//   assignedTo?: number;
// }

// Step 2: Omit<CreateTaskData, 'projectId'>
// // Removes projectId
// {
//   title: string;
//   description?: string;
//   status?: 'todo' | 'in-progress' | 'review' | 'done';
//   priority?: 'low' | 'medium' | 'high' | 'urgent';
//   dueDate?: string;
//   // projectId is gone! ✅
//   assignedTo?: number;
// }

// Step 3: Partial<...>
// // Makes everything optional
// {
//   title?: string;           // Now optional
//   description?: string;
//   status?: 'todo' | 'in-progress' | 'review' | 'done';
//   priority?: 'low' | 'medium' | 'high' | 'urgent';
//   dueDate?: string;
//   assignedTo?: number;
// }

// Final Result:
// export interface UpdateTaskData {
//   title?: string;
//   description?: string;
//   status?: 'todo' | 'in-progress' | 'review' | 'done';
//   priority?: 'low' | 'medium' | 'high' | 'urgent';
//   dueDate?: string;
//   assignedTo?: number;
//   // No projectId - you can't change which project a task belongs to!
// }



// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T; // Generic - can be any type
}

// T is a placeholder for any type
// ApiResponse<User>        // data is User
// ApiResponse<Project[]>   // data is array of Projects

// Example usage
// const response: ApiResponse<User> = {
//   success: true,
//   data: {
//     id: 1,
//     name: "John",
//     email: "john@example.com",
//     role: "user",
//     isActive: true,
//     createdAt: "2024-01-01",
//     updatedAt: "2024-01-01"
//   }
// }


export interface PaginationData<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Query params
export interface ProjectQueryParams {
  page?: number;
  limit?: number;
  status?: 'active' | 'completed' | 'on-hold' | 'cancelled';
  search?: string;
}

export interface TaskQueryParams {
  page?: number;
  limit?: number;
  status?: 'todo' | 'in-progress' | 'review' | 'done';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  projectId?: number;
  assignedTo?: number;
  search?: string;
  overdue?: boolean;
}

// Statistics
export interface ProjectStats {
  total: number;
  active: number;
  completed: number;
  onHold: number;
  cancelled: number;
  totalTasks: number;
}

export interface TaskStats {
  total: number;
  byStatus: {
    todo: number;
    inProgress: number;
    review: number;
    done: number;
  };
  byPriority: {
    low: number;
    medium: number;
    high: number;
    urgent: number;
  };
  overdue: number;
  assignedToMe: number;
  myOverdue: number;
}




// More Utility Types Examples
// Pick<T, K> - Select Specific Properties
// interface User {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   role: string;
// }

// // Only pick safe properties to send to frontend
// type PublicUser = Pick<User, 'id' | 'name' | 'email'>;
// // Result:
// // {
// //   id: number;
// //   name: string;
// //   email: string;
// // }
// Required<T> - Make All Properties Required
// interface CreateProjectData {
//   name: string;
//   description?: string;  // Optional
// }

// type RequiredProject = Required<CreateProjectData>;
// // Result:
// // {
// //   name: string;
// //   description: string;  // Now required!
// // }
// Record<K, T> - Create Object with Specific Keys
// type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';

// type TaskCounts = Record<TaskStatus, number>;
// // Result:
// // {
// //   todo: number;
// //   'in-progress': number;
// //   review: number;
// //   done: number;
// // }

// const counts: TaskCounts = {
//   todo: 5,
//   'in-progress': 3,
//   review: 2,
//   done: 10
// };
