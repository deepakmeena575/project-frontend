import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="mb-6">
          <label className="block mb-1">Role</label>
          <select name="role" value={form.role} onChange={handleChange} className="w-full border px-3 py-2 rounded">
            <option value="student">Student</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
        <div className="mt-4 text-center">
          Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </div>
      </form>
    </div>
  );
};

export default Login; 