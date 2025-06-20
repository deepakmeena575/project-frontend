import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-gray-50 font-sans">
      <Navbar />
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-indigo-100 p-6">
          <Input
            className="w-full sm:w-80 px-4 py-3 rounded-xl border border-indigo-100 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 shadow-sm transition"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/create")}
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-sky-600 transition px-8 py-3 text-lg">
            New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  )
}

export default AdminJobs