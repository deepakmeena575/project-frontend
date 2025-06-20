import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ fullname: '', email: '', phoneNumber: '', password: '', role: 'student' });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (profilePhoto) formData.append('file', profilePhoto);
    try {
      const res = await fetch('/api/user/register', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md" encType="multipart/form-data">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input type="text" name="fullname" value={form.fullname} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Phone Number</label>
          <input type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Role</label>
          <select name="role" value={form.role} onChange={handleChange} className="w-full border px-3 py-2 rounded">
            <option value="student">Student</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-1">Profile Photo</label>
          <input type="file" name="file" accept="image/*" onChange={handleFileChange} className="w-full" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
        <div className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Register; 