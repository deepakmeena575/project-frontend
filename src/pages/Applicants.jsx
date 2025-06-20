import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

async function safeJson(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

export default function Applicants() {
  const { id } = useParams(); 
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusUpdating, setStatusUpdating] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/application/${id}/applicants`);
        const data = await safeJson(res);
        if (!res.ok) throw new Error(data.message || 'Failed to fetch applicants');
        setApplicants(data.applicants || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [id, success]);

  const handleStatusUpdate = async (appId, newStatus) => {
    setStatusUpdating(appId + newStatus);
    setSuccess('');
    setError('');
    try {
      const res = await fetch(`/api/application/status/${appId}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await safeJson(res);
      if (!res.ok) throw new Error(data.message || 'Failed to update status');
      setSuccess('Status updated!');
    } catch (err) {
      setError(err.message);
    } finally {
      setStatusUpdating('');
    }
  };

  if (loading) return <div className="text-center py-10">Loading applicants...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-2">
      <h1 className="text-3xl font-bold mb-6">Applicants</h1>
      {success && <div className="text-green-600 mb-4">{success}</div>}
      <div className="bg-white rounded shadow p-6">
        {applicants.length === 0 ? (
          <div>No applicants yet.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map(app => (
                <tr key={app._id}>
                  <td>{app.applicant?.fullname}</td>
                  <td>{app.applicant?.email}</td>
                  <td className="capitalize">{app.status}</td>
                  <td>
                    <select
                      value={app.status}
                      onChange={e => handleStatusUpdate(app._id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
} 