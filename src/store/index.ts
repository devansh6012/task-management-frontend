import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import projectReducer from '../features/projects/projectSlice';
import taskReducer from '../features/tasks/taskSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    tasks: taskReducer,
  },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



// What's happening?

// configureStore() - Creates Redux store with:

// Automatic Redux DevTools setup
// Built-in middleware (thunk for async)
// Better TypeScript support


// Type Exports:

// export type RootState = ReturnType<typeof store.getState>;

// Gets the type of entire state tree
// Used for useSelector hook

// export type AppDispatch = typeof store.dispatch;

// Gets type of dispatch function
// Needed for async thunks