import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { login, clearError } from '../features/auth/authSlice';
import toast from 'react-hot-toast';
import { LogIn } from 'lucide-react';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Type Inference:
// type LoginFormData = z.infer<typeof loginSchema>;
// Equivalent to:
// type LoginFormData = {
//   email: string;
//   password: string;
// }


const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema), // Connect Zod validation
  });

    //   useForm Hook:

    // register - Connects inputs to form state
    // handleSubmit - Handles form submission with validation
    // errors - Validation errors
    // zodResolver - Uses Zod schema for validation


  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onSubmit = async (data: LoginFormData) => {
    const result = await dispatch(login(data));
    if (login.fulfilled.match(result)) {
      toast.success('Login successful!');
    }
  };

//   Flow:
    // User submits form
    // React Hook Form validates with Zod
    // If valid, calls onSubmit
    // Dispatches Redux login thunk
    // Waits for result
    // Shows success toast if login succeeds
    // useEffect redirects to dashboard



  return (
    <div className="card">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <LogIn className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            {...register('email')}
            className="input-field"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            {...register('password')}
            className="input-field"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      {/* Register link */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;


// 1. Spread Operator {...register('email')}:
// Expands to:
// {
//   name: "email",
//   onChange: (e) => { /* update form state */ },
//   onBlur: (e) => { /* validate */ },
//   ref: (el) => { /* register input */ }
// }


// 2. Dynamic Button Text:
// {loading ? 'Signing in...' : 'Sign In'}

// Shows "Signing in..." during API call
// Provides user feedback

