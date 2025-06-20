import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('/api/user/logout', { method: 'GET', credentials: 'include' })
      .then(() => {
        localStorage.removeItem('user');
        navigate('/login');
      });
  };

  return (
    <nav className="bg-white shadow py-4 px-6 flex justify-between items-center">
      <div className="font-bold text-xl">
        <Link to="/">JobPortal</Link>
      </div>
      <div className="flex gap-6 items-center">
        <Link to="/jobs" className="hover:underline">Jobs</Link>
        {user && user.role === 'recruiter' && <Link to="/dashboard" className="hover:underline">Dashboard</Link>}
        {user && user.role === 'student' && <Link to="/dashboard" className="hover:underline">Dashboard</Link>}
        {user && <Link to="/profile" className="hover:underline">Profile</Link>}
        {!user && <Link to="/login" className="hover:underline">Login</Link>}
        {!user && <Link to="/register" className="hover:underline">Register</Link>}
        {user && <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar; 