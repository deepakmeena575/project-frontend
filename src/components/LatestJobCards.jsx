import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job._id}`)} className="p-6 rounded-2xl shadow-xl bg-white/80 backdrop-blur-lg border border-indigo-100 cursor-pointer flex flex-col gap-3 transition-all duration-300 ease-in-out hover:scale-[1.025] hover:shadow-2xl hover:border-indigo-200">
            <div>
                <h1 className="font-bold text-base text-indigo-700">{job?.company?.name}</h1>
                <p className="text-xs text-slate-400">India</p>
            </div>
            <div>
                <h1 className="font-extrabold text-lg text-slate-800 mb-1">{job?.title}</h1>
                <p className="text-sm text-slate-600 line-clamp-3">{job?.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge className="bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-full" variant="ghost">{job?.position} Positions</Badge>
                <Badge className="bg-sky-100 text-sky-600 font-bold px-3 py-1 rounded-full" variant="ghost">{job?.jobType}</Badge>
                <Badge className="bg-emerald-100 text-emerald-600 font-bold px-3 py-1 rounded-full" variant="ghost">{job?.salary} LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards