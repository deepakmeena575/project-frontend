import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => { 
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(()=>{ 
        console.log('called');
        const filteredJobs = allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    },[allAdminJobs,searchJobByText])
    return (
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-100 p-8 font-sans">
            <Table>
                <TableCaption className="text-slate-500 mb-4">A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow className="bg-indigo-50">
                        <TableHead className="text-indigo-700 font-bold text-base">Company Name</TableHead>
                        <TableHead className="text-indigo-700 font-bold text-base">Role</TableHead>
                        <TableHead className="text-indigo-700 font-bold text-base">Date</TableHead>
                        <TableHead className="text-right text-indigo-700 font-bold text-base">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <tr className="hover:bg-indigo-50/60 transition-colors duration-200" key={job._id}>
                                <TableCell className="text-slate-700 font-semibold">{job?.company?.name}</TableCell>
                                <TableCell className="text-slate-600">{job?.title}</TableCell>
                                <TableCell className="text-slate-500">{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal className="text-indigo-400 hover:text-indigo-700 transition-colors" /></PopoverTrigger>
                                        <PopoverContent className="w-36 rounded-xl shadow-lg border-indigo-100 p-1">
                                            <div onClick={()=> navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-full cursor-pointer hover:bg-indigo-50 px-2 py-1 rounded transition-colors'>
                                                <Edit2 className='w-4 text-sky-600' />
                                                <span className="text-slate-700 font-medium">Edit</span>
                                            </div>
                                            <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-full gap-2 cursor-pointer mt-1 hover:bg-indigo-50 px-2 py-1 rounded transition-colors'>
                                                <Eye className='w-4 text-emerald-600'/>
                                                <span className="text-slate-700 font-medium">Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable