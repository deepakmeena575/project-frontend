import React, { useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { setAllApplicantsForRecruiter } from '@/redux/applicationSlice';
import { Badge } from '../ui/badge';

const ApplicantsTable = ({ applications }) => {
    const dispatch = useDispatch();

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const token = localStorage.getItem("token");

            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/status/${id}/update`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`  // ✅ Add Bearer token here
                    }
                }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                
                const updatedApplications = applications.map(app =>
                    app._id === id ? { ...app, status: status.toLowerCase() } : app
                );
                dispatch(setAllApplicantsForRecruiter(updatedApplications));
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-100 p-8 font-sans">
            <Table>
                <TableCaption className="text-slate-500 mb-4">A list of all applications for your posted jobs</TableCaption>
                <TableHeader>
                    <TableRow className="bg-indigo-50">
                        <TableHead className="text-indigo-700 font-bold text-base">Job Title</TableHead>
                        <TableHead className="text-indigo-700 font-bold text-base">Student Name</TableHead>
                        <TableHead className="text-indigo-700 font-bold text-base">Email</TableHead>
                        <TableHead className="text-indigo-700 font-bold text-base">Contact</TableHead>
                        <TableHead className="text-indigo-700 font-bold text-base">Resume</TableHead>
                        <TableHead className="text-indigo-700 font-bold text-base">Application Date</TableHead>
                        <TableHead className="text-indigo-700 font-bold text-base">Status</TableHead>
                        <TableHead className="text-right text-indigo-700 font-bold text-base">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applications && applications.length > 0 ? (
                            applications.map((item) => (
                                <tr className="hover:bg-indigo-50/60 transition-colors duration-200" key={item._id}>
                                    <TableCell className="text-indigo-600 font-semibold">{item?.job?.title}</TableCell>
                                    <TableCell className="text-slate-700 font-semibold">{item?.applicant?.fullname}</TableCell>
                                    <TableCell className="text-slate-600">{item?.applicant?.email}</TableCell>
                                    <TableCell className="text-slate-600">{item?.applicant?.phoneNumber}</TableCell>
                                    <TableCell>
                                        {
                                            item.applicant?.profile?.resume ? <a className="text-sky-600 font-semibold underline hover:text-sky-800 transition-colors" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">Resume Link</a> : <span className="text-slate-400">NA</span>
                                        }
                                    </TableCell>
                                    <TableCell className="text-slate-500">{new Date(item?.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        {
                                            item.status === 'pending' && <Badge variant="outline" className="bg-yellow-100 text-yellow-700">Pending</Badge>
                                        }
                                        {
                                            item.status === 'accepted' && <Badge variant="outline" className="bg-green-100 text-green-700">Accepted</Badge>
                                        }
                                        {
                                            item.status === 'rejected' && <Badge variant="outline" className="bg-red-100 text-red-700">Rejected</Badge>
                                        }
                                    </TableCell>
                                    <TableCell className="float-right cursor-pointer">
                                        {
                                            item.status === 'pending' ? (
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <MoreHorizontal className="text-indigo-400 hover:text-indigo-700 transition-colors" />
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-36 rounded-xl shadow-lg border-indigo-100 p-1">
                                                        <div onClick={() => statusHandler("accepted", item?._id)} className='flex w-full items-center my-1 cursor-pointer hover:bg-indigo-50 px-2 py-1 rounded transition-colors'>
                                                            <span className="text-slate-700 font-medium">Accept</span>
                                                        </div>
                                                        <div onClick={() => statusHandler("rejected", item?._id)} className='flex w-full items-center my-1 cursor-pointer hover:bg-indigo-50 px-2 py-1 rounded transition-colors'>
                                                            <span className="text-slate-700 font-medium">Reject</span>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            ) : (
                                                <Badge variant="outline" className={`text-white ${item.status === 'accepted' ? 'bg-green-500' : 'bg-red-500'}`}>
                                                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                                </Badge>
                                            )
                                        }
                                    </TableCell>
                                </tr>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="8" className="text-center text-slate-500 py-4">
                                    No applications found.
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable