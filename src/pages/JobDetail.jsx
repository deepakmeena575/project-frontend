import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [applyMsg, setApplyMsg] = useState('');
  
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/job/get/${id}`, { credentials: 'include' });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        setJob(data.job);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    setApplyMsg('');
    try {
      const res = await fetch(`/api/application/apply/${id}`, { method: 'GET', credentials: 'include' });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setApplyMsg('Applied successfully!');
    } catch (err) {
      setApplyMsg(err.message);
    }
  };

  if (loading) return <div className="text-center py-10 font-sans text-lg text-slate-500">Loading job details...</div>;
  if (error) return <div className="text-center text-rose-500 py-10 font-sans text-lg">{error}</div>;
  if (!job) return null;

  return (
    <div className="min-h-[60vh] bg-gradient-to-br from-indigo-100 via-sky-100 to-gray-50 py-12 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-100 p-10">
          <h1 className="text-3xl font-extrabold text-indigo-700 mb-2 text-center">{job.title}</h1>
          <div className="mb-2 text-slate-500 text-center text-lg">{job.company?.name || 'Unknown Company'}</div>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <span className="bg-sky-100 text-sky-600 px-4 py-1 rounded-full font-semibold text-sm">{job.location}</span>
            <span className="bg-emerald-100 text-emerald-600 px-4 py-1 rounded-full font-semibold text-sm">Salary: {job.salary} LPA</span>
            <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full font-semibold text-sm">{job.experienceLevel}</span>
            <span className="bg-rose-100 text-rose-600 px-4 py-1 rounded-full font-semibold text-sm">{job.jobType}</span>
            <span className="bg-gray-100 text-slate-600 px-4 py-1 rounded-full font-semibold text-sm">Open: {job.position}</span>
          </div>
          <div className="mb-6">
            <h2 className="font-bold text-slate-700 mb-2 text-lg">Description</h2>
            <p className="text-slate-600 leading-relaxed">{job.description}</p>
          </div>
          <div className="mb-6">
            <h2 className="font-bold text-slate-700 mb-2 text-lg">Requirements</h2>
            <ul className="list-disc ml-6 text-slate-600">
              {job.requirements?.map((req, idx) => <li key={idx}>{req}</li>)}
            </ul>
          </div>
          {user?.role === 'student' && (
            <button onClick={handleApply} className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-bold text-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200">
              Apply
            </button>
          )}
          {applyMsg && <div className="mt-4 text-sky-600 text-center font-semibold">{applyMsg}</div>}
        </div>
      </div>
    </div>
  );
};

export default JobDetail; 