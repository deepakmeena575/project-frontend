import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ fullname: '', email: '', phoneNumber: '', bio: '', skills: '' });
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      setForm({
        fullname: userData.fullname || '',
        email: userData.email || '',
        phoneNumber: userData.phoneNumber || '',
        bio: userData.profile?.bio || '',
        skills: userData.profile?.skills?.join(',') || '',
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleProfilePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (resume) formData.append('file', resume);
    if (profilePhoto) formData.append('profilePhoto', profilePhoto);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch('/api/user/profile/update', {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`  // ✅ Add Bearer token here
          // Note: Do NOT set 'Content-Type' for multipart/form-data when using FormData. The browser will handle it automatically.
        }
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setMessage('Profile updated successfully!');
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user) return <div className="text-center py-10 font-sans text-lg text-slate-500">Loading profile...</div>;

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-indigo-100 via-sky-100 to-gray-50 py-12 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-100 p-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-28 h-28 rounded-full bg-indigo-100 border-4 border-indigo-200 flex items-center justify-center mb-4 overflow-hidden relative group">
              {/* Optionally show user profile photo if available */}
              {user.profile?.profilePhoto ? (
                <img src={user.profile.profilePhoto} alt="Profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                <span className="text-4xl text-indigo-400 font-bold">{user.fullname[0]}</span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePhotoChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="profile-photo-upload"
              />
              <label
                htmlFor="profile-photo-upload"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer text-sm font-semibold"
              >
                Change Photo
              </label>
            </div>
            <h1 className="text-3xl font-extrabold text-indigo-700 mb-1">{user.fullname}</h1>
            <p className="text-slate-500">{user.email}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {message && <div className="mb-2 text-emerald-600 text-center font-semibold">{message}</div>}
            {error && <div className="mb-2 text-rose-500 text-center font-semibold">{error}</div>}
            <div>
              <label className="block mb-1 text-slate-700 font-semibold">Full Name</label>
              <input type="text" name="fullname" value={form.fullname} onChange={handleChange} className="w-full border border-indigo-100 px-4 py-3 rounded-xl bg-white/80 shadow-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition" />
            </div>
            <div>
              <label className="block mb-1 text-slate-700 font-semibold">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border border-indigo-100 px-4 py-3 rounded-xl bg-white/80 shadow-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition" />
            </div>
            <div>
              <label className="block mb-1 text-slate-700 font-semibold">Phone Number</label>
              <input type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="w-full border border-indigo-100 px-4 py-3 rounded-xl bg-white/80 shadow-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition" />
            </div>
            <div>
              <label className="block mb-1 text-slate-700 font-semibold">Bio</label>
              <textarea name="bio" value={form.bio} onChange={handleChange} className="w-full border border-indigo-100 px-4 py-3 rounded-xl bg-white/80 shadow-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition min-h-[80px]" />
            </div>
            <div>
              <label className="block mb-1 text-slate-700 font-semibold">Skills <span className="text-xs text-slate-400">(comma separated)</span></label>
              <input type="text" name="skills" value={form.skills} onChange={handleChange} className="w-full border border-indigo-100 px-4 py-3 rounded-xl bg-white/80 shadow-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition" />
              {user.profile?.skills && user.profile.skills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {user.profile.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="block mb-1 text-slate-700 font-semibold">Resume (PDF)</label>
              <input type="file" name="file" accept="application/pdf" onChange={handleFileChange} className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
              {user.profile?.resume && (
                <div className="mt-3 text-sm text-slate-500 flex items-center justify-between">
                  <span>Current: <a href={user.profile.resume} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold underline hover:text-indigo-800 transition">View Resume</a></span>
                  {resume && <span className="text-emerald-600 font-semibold">New file selected!</span>}
                </div>
              )}
              {!user.profile?.resume && (
                <div className="mt-3 text-sm text-slate-400">No resume uploaded yet.</div>
              )}
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-bold text-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile; 