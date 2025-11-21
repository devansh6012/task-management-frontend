import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/authApi';
import type { User, LoginCredentials, RegisterData } from '../../types';

// understanding type only
// Understanding the Problem
// What happens during compilation:

// // Source code (TypeScript)
// import { User, LoginCredentials } from './types';

// const user: User = { ... };

// Compiles to (JavaScript):

// JavaScript has no types!
// import { User, LoginCredentials } from './types';
// //       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^ These don't exist in JS!

// const user = { ... };  // No type annotation

// The issue:
// JavaScript tries to import User and LoginCredentials
// But they're just types, not actual values
// Runtime error: "does not provide an export named 'User'"


// The Solution: Type-Only Imports

// // Explicit: This is ONLY a type
// import type { User, LoginCredentials } from './types';

// Compiles to:
// // Types are completely removed!
// // No import statement at all!

// const user = { ... };




interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Get initial state from localStorage
const token = localStorage.getItem('token');
const userStr = localStorage.getItem('user');
const user = userStr ? JSON.parse(userStr) : null;

const initialState: AuthState = {
  user,
  token,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

// The !! operator:
// !!token  // Converts any value to boolean
// "" -> false
// "abc" -> true
// null -> false


// Async thunks
export const register = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authApi.register(data);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const user = await authApi.getProfile();
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get profile');
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Synchronous actions
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle async thunk actions
    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Profile
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


// What is createAsyncThunk?

// Handles async operations in Redux
// Automatically dispatches 3 actions:

// login.pending - When starting
// login.fulfilled - On success
// login.rejected - On error


// Why rejectWithValue?

// Customizes error payload
// Error message goes to action.payload in rejected case
// Better than generic error objects


// Flow:

// Component calls dispatch(login(credentials))
// Thunk runs async function
// Calls backend API
// On success: saves token, returns data
// On error: returns error message
// Redux updates state based on result



// Reducers vs ExtraReducers:

// reducers - Synchronous actions you define
// extraReducers - Handle actions from createAsyncThunk

// Immer Magic:
// Redux Toolkit uses Immer, so you can "mutate" state:
// state.loading = true;  // Looks like mutation
// Actually creates a new immutable state behind the scenes!


export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;








// Phase 3a: Success (Fulfilled)
// // Redux automatically dispatches:
// {
//   type: 'auth/login/fulfilled',
//   payload: {  // ← Your return value
//     user: { id: 1, name: "John", ... },
//     token: "eyJhbGciOiJIUzI1NiIs..."
//   },
//   meta: { requestId: 'abc123', ... }
// }

// // Your reducer catches it:
// .addCase(login.fulfilled, (state, action) => {
//   state.loading = false;
//   state.isAuthenticated = true;
//   state.user = action.payload.user;
//   state.token = action.payload.token;
// })

// // State becomes:
// {
//   user: { id: 1, name: "John", ... },
//   token: "eyJhbGciOiJIUzI1NiIs...",
//   isAuthenticated: true,
//   loading: false,  // ← Changed back!
//   error: null
// }
// Phase 3b: Error (Rejected)
// // Redux automatically dispatches:
// {
//   type: 'auth/login/rejected',
//   payload: "Invalid credentials",  // ← Your rejectWithValue
//   error: { message: "..." },
//   meta: { requestId: 'abc123', ... }
// }

// // Your reducer catches it:
// .addCase(login.rejected, (state, action) => {
//   state.loading = false;
//   state.error = action.payload as string;
// })

// // State becomes:
// {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   loading: false,  // ← Changed!
//   error: "Invalid credentials"  // ← Error message!
// }

// 5. Synchronous Reducers
// reducers: {
//   logout: (state) => {
//     state.user = null;
//     state.token = null;
//     state.isAuthenticated = false;
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   },
//   clearError: (state) => {
//     state.error = null;
//   },
// },

// Usage:
// // Synchronous - Instant
// dispatch(logout())  // Immediately updates state

// // Async - Returns a promise
// dispatch(login(credentials))
//   .then((result) => {
//     if (login.fulfilled.match(result)) {
//       console.log('Success!');
//     }
//   });

// 6. ExtraReducers - Handling Thunk Actions
// extraReducers: (builder) => {
//   builder
//     .addCase(login.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     })
//     .addCase(login.fulfilled, (state, action) => {
//       state.loading = false;
//       state.isAuthenticated = true;
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//     })
//     .addCase(login.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload as string;
//     });
// }
// The Builder Pattern:
// builder
//   .addCase(actionType1, reducer1)
//   .addCase(actionType2, reducer2)
//   .addCase(actionType3, reducer3)
// // Chainable methods
// Why action.payload as string?
// .addCase(login.rejected, (state, action) => {
//   state.error = action.payload as string;
//   //                           ^^^^^^^^^ Type assertion
// })
// TypeScript doesn't know that rejectWithValue returns a string, so we tell it:
// // Without 'as string'
// state.error = action.payload  // Error: Type 'unknown' not assignable to 'string | null'

// // With 'as string'
// state.error = action.payload as string  // ✅ Works

// 7. Immer Magic - "Mutating" Immutable State
// .addCase(login.fulfilled, (state, action) => {
//   state.loading = false;  // Looks like mutation!
//   state.user = action.payload.user;
// })
// What's really happening:
// Without Immer (traditional Redux):
// case LOGIN_FULFILLED:
//   return {
//     ...state,  // Copy all state
//     loading: false,
//     user: action.payload.user,
//     isAuthenticated: true,
//     token: action.payload.token
//   };
// With Immer (Redux Toolkit):
// state.loading = false;  // Immer creates new state behind the scenes
// Immer converts:
// // What you write
// state.loading = false;

// // What actually happens
// return {
//   ...state,
//   loading: false
// };
// Complex example:
// // Without Immer - painful!
// const newProjects = state.projects.map(p => 
//   p.id === action.payload.id 
//     ? { ...p, name: action.payload.name }
//     : p
// );
// return { ...state, projects: newProjects };

// // With Immer - easy!
// const project = state.projects.find(p => p.id === action.payload.id);
// if (project) {
//   project.name = action.payload.name;
// }