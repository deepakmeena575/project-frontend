import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RecruiterProfile from '../components/admin/RecruiterProfile';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Dashboard = () => {
  const { user } = useSelector(store => store.auth);
  const { allAdminJobs } = useSelector(store => store.job);
  const { allAppliedJobs } = useSelector(store => store.application);

  
  useGetAllAdminJobs(); 
  useGetAppliedJobs(); 

  if (user?.role === 'recruiter') {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-indigo-100 via-sky-100 to-gray-50 py-12 font-sans">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold text-indigo-700 mb-6">Recruiter Dashboard</h1>
          <RecruiterProfile />
          <h2 className="text-xl font-semibold text-slate-700 mb-4 mt-8">Your Posted Jobs</h2>
          <div className="grid gap-8">
            {allAdminJobs.length === 0 ? (
              <div className="text-slate-500 text-lg">No jobs posted yet.</div>
            ) : (
              allAdminJobs.map(job => (
                <div key={job._id} className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-indigo-100 flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-indigo-700 mb-1">{job.title}</h3>
                  <div className="text-slate-500 mb-2">{job.company?.name || 'Unknown Company'}</div>
                  <div className="flex gap-4 mt-2">
                    <Link to={`/jobs/${job._id}`} className="text-sky-600 font-semibold underline hover:text-sky-800 transition">View Job</Link>
                    <Link to={`/jobs/${job._id}/applicants`} className="text-emerald-600 font-semibold underline hover:text-emerald-800 transition">View Applicants</Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  
  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-indigo-100 via-sky-100 to-gray-50 py-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-6">Student Dashboard</h1>
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Your Applications</h2>
        <div className="grid gap-8">
          {allAppliedJobs.length === 0 ? (
            <div className="text-slate-500 text-lg">No applications yet.</div>
          ) : (
            allAppliedJobs.map(app => (
              <div key={app._id} className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-indigo-100 flex flex-col gap-2">
                <div className="font-bold text-indigo-700 text-lg">{app.job?.title}</div>
                <div className="text-slate-500">{app.job?.company?.name}</div>
                <div className="text-sm mt-1">
                  Status: <span className={
                    app.status === 'rejected' ? 'bg-rose-100 text-rose-600 px-3 py-1 rounded-full font-semibold' :
                    app.status === 'pending' ? 'bg-sky-100 text-sky-600 px-3 py-1 rounded-full font-semibold' :
                    'bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full font-semibold'
                  }>{app.status.toUpperCase()}</span>
                </div>
                <Link to={`/jobs/${app.job?._id}`} className="text-sky-600 font-semibold underline hover:text-sky-800 transition mt-2">View Job</Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 