import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


// ### **What is Redux?**
// Redux is a **global state manager**. Think of it as a JavaScript object that:
// - Stores data accessible from any component
// - Updates in a predictable way
// - Persists across page navigations

// ### **Redux Toolkit Structure:**
// ```
// State (Global Data)
// ├── auth (user, token, isAuthenticated)
// ├── projects (projects list, current project, stats)
// └── tasks (tasks list, current task, stats)



// Why custom hooks?

// Without types:
// const user = useSelector(state => state.auth.user);  // TypeScript doesn't know state shape

// With typed hooks:
// const user = useAppSelector(state => state.auth.user);  // Full autocomplete! 🎉

// Usage in components:
// const { user, loading } = useAppSelector((state) => state.auth);
// const dispatch = useAppDispatch();

// dispatch(login({ email, password }));
