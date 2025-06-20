import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/job/get', { credentials: 'include' });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        setJobs(data.jobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <div className="text-center py-10">Loading jobs...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      <div className="grid gap-6">
        {jobs.length === 0 ? (
          <div>No jobs found.</div>
        ) : (
          jobs.map(job => (
            <div key={job._id} className="bg-white p-6 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-1">{job.title}</h2>
                <div className="text-gray-600">{job.company?.name || 'Unknown Company'}</div>
                <div className="text-gray-500 text-sm">{job.location}</div>
              </div>
              <Link to={`/jobs/${job._id}`} className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">View Details</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobList; 