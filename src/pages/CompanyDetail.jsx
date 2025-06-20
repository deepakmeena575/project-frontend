import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CompanyDetail = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(`/api/company/get/${id}`, { credentials: 'include' });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        setCompany(data.company);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  if (loading) return <div className="text-center py-10 font-sans text-lg text-slate-500">Loading company details...</div>;
  if (error) return <div className="text-center text-rose-500 py-10 font-sans text-lg">{error}</div>;
  if (!company) return null;

  return (
    <div className="min-h-[60vh] bg-gradient-to-br from-indigo-100 via-sky-100 to-gray-50 py-12 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-100 p-10 flex flex-col items-center">
          {company.logo && <img src={company.logo} alt="Company Logo" className="h-28 w-28 mb-6 object-contain rounded-full border-2 border-indigo-100 bg-indigo-50" />}
          <h1 className="text-3xl font-extrabold text-indigo-700 mb-2 text-center">{company.name}</h1>
          <div className="mb-2 text-slate-500 text-center">{company.location}</div>
          <div className="mb-4 text-slate-700 text-center">{company.description}</div>
          {company.website && (
            <div className="mb-2">
              <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-sky-600 font-semibold underline hover:text-sky-800 transition">Visit Website</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail; 