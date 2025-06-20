import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded shadow p-8 mt-8">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to JobPortal</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
        Discover your next career opportunity or find the perfect candidate. Browse thousands of jobs and top companies, and manage your applications with ease.
      </p>
      <div className="flex gap-4">
        <Link to="/jobs" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition text-lg font-semibold">Browse Jobs</Link>
        <Link to="/companies" className="bg-gray-200 text-blue-700 px-6 py-2 rounded hover:bg-gray-300 transition text-lg font-semibold">View Companies</Link>
      </div>
    </div>
  );
} 