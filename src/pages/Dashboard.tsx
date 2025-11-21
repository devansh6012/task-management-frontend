import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProjectStats } from '../features/projects/projectSlice';
import { fetchTaskStats } from '../features/tasks/taskSlice';
import { FolderKanban, CheckSquare, Clock, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { stats: projectStats } = useAppSelector((state) => state.projects);
  const { stats: taskStats } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchProjectStats());
    dispatch(fetchTaskStats());
  }, [dispatch]);

  const stats = [
    {
      title: 'Total Projects',
      value: projectStats?.total || 0,
      icon: FolderKanban,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Tasks',
      value: taskStats?.total || 0,
      icon: CheckSquare,
      color: 'bg-green-500',
    },
    {
      title: 'My Tasks',
      value: taskStats?.assignedToMe || 0,
      icon: Clock,
      color: 'bg-purple-500',
    },
    {
      title: 'Overdue',
      value: taskStats?.myOverdue || 0,
      icon: AlertCircle,
      color: 'bg-red-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your projects</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Stats */}
      {projectStats && (
        <div className="card mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Project Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{projectStats.active}</p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{projectStats.completed}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{projectStats.onHold}</p>
              <p className="text-sm text-gray-600">On Hold</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{projectStats.cancelled}</p>
              <p className="text-sm text-gray-600">Cancelled</p>
            </div>
          </div>
        </div>
      )}

      {/* Task Stats */}
      {taskStats && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Task Breakdown</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">By Status</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <p className="text-lg font-bold">{taskStats.byStatus.todo}</p>
                  <p className="text-xs text-gray-600">To Do</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded">
                  <p className="text-lg font-bold">{taskStats.byStatus.inProgress}</p>
                  <p className="text-xs text-gray-600">In Progress</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded">
                  <p className="text-lg font-bold">{taskStats.byStatus.review}</p>
                  <p className="text-xs text-gray-600">Review</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded">
                  <p className="text-lg font-bold">{taskStats.byStatus.done}</p>
                  <p className="text-xs text-gray-600">Done</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">By Priority</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <p className="text-lg font-bold">{taskStats.byPriority.low}</p>
                  <p className="text-xs text-gray-600">Low</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded">
                  <p className="text-lg font-bold">{taskStats.byPriority.medium}</p>
                  <p className="text-xs text-gray-600">Medium</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded">
                  <p className="text-lg font-bold">{taskStats.byPriority.high}</p>
                  <p className="text-xs text-gray-600">High</p>
                </div>
                <div className="text-center p-3 bg-red-50 rounded">
                  <p className="text-lg font-bold">{taskStats.byPriority.urgent}</p>
                  <p className="text-xs text-gray-600">Urgent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;



// Key Concepts:
// 1. Optional Chaining ?.:
// projectStats?.total || 0
// // If projectStats is null/undefined, returns 0
// // Prevents "Cannot read property 'total' of null" errors


// 2. Data-Driven UI:
// const stats = [ /* array of objects */ ];

// {stats.map((stat) => (
//   <div key={stat.title}>...</div>
// ))}

// Define data structure once
// Map over it to create UI
// Easy to add/remove items


// 3. Dynamic Component Rendering:
// <stat.icon className="text-white" size={24} />

// stat.icon is a React component
// Stored in variable, rendered dynamically

