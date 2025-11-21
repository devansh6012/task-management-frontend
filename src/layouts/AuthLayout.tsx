import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

const AuthLayout = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Task Manager</h1>
          <p className="text-gray-600 mt-2">Manage your projects efficiently</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;



// Layout Pattern:
// Layouts wrap pages and provide consistent structure (navbar, sidebar, etc.)


// Key Concepts:
// 1. Route Protection:
// if (isAuthenticated) {
//   return <Navigate to="/dashboard" replace />;
// }

// Logged-in users can't access login/register
// Automatically redirects to dashboard

// 2. <Outlet /> Component:

// Placeholder for child routes
// Login or Register page renders here
// Like a {children} prop but for routes