import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/company/get');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch companies');
        setCompanies(data.companies || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  if (loading) return <div className="text-center py-10 font-sans text-lg text-slate-500">Loading companies...</div>;
  if (error) return <div className="text-center text-rose-500 py-10 font-sans text-lg">{error}</div>;

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-indigo-100 via-sky-100 to-gray-50 py-12 font-sans">
      <div className="max-w-5xl mx-auto px-2">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-8">Companies</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {companies.length === 0 && <div className="text-slate-500 text-lg">No companies found.</div>}
          {companies.map(company => (
            <Link to={`/companies/${company._id}`} key={company._id} className="block bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-indigo-100 p-7 hover:scale-[1.025] hover:shadow-2xl transition duration-200">
              {company.logo && <img src={company.logo} alt={company.name} className="h-14 mb-4 object-contain mx-auto rounded-full border-2 border-indigo-100 bg-indigo-50" />}
              <h2 className="text-xl font-bold text-indigo-700 mb-2 text-center">{company.name}</h2>
              <div className="text-slate-500 mb-1 text-center">{company.location}</div>
              <div className="text-sky-600 text-sm mb-2 text-center">{company.website}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 