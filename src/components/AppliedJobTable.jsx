import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    return (
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-100 p-8 max-w-3xl mx-auto mt-10 font-sans">
            <Table>
                <TableCaption className="text-slate-500 mb-4">A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow className="bg-indigo-50">
                        <TableHead className="text-indigo-700 font-bold text-base">Date</TableHead>
                        <TableHead className="text-indigo-700 font-bold text-base">Job Role</TableHead>
                        <TableHead className="text-indigo-700 font-bold text-base">Company</TableHead>
                        <TableHead className="text-right text-indigo-700 font-bold text-base">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-slate-400 font-semibold">You haven't applied to any job yet.</TableCell>
                            </TableRow>
                        ) : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id} className="hover:bg-indigo-50/60 transition-colors duration-200">
                                <TableCell className="text-slate-600 font-medium">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="text-slate-700 font-semibold">{appliedJob.job?.title}</TableCell>
                                <TableCell className="text-slate-600">{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={
                                        `${appliedJob?.status === "rejected" ? 'bg-rose-100 text-rose-600' : appliedJob.status === 'pending' ? 'bg-sky-100 text-sky-600' : 'bg-emerald-100 text-emerald-600'} px-4 py-1 rounded-full font-bold text-sm shadow-sm`
                                    }>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable