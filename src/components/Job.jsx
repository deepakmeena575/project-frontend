import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();
    

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    return (
        <div className="p-6 rounded-2xl shadow-xl bg-white/80 backdrop-blur-lg border border-indigo-100 flex flex-col gap-3 transition-all duration-300 ease-in-out hover:scale-[1.025] hover:shadow-2xl hover:border-indigo-200">
            <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-slate-400 font-semibold">{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full border-indigo-100 hover:bg-indigo-50 transition-all duration-300" size="icon"><Bookmark className="text-indigo-400" /></Button>
            </div>
            <div className="flex items-center gap-3 my-2">
                <div className="p-2 bg-indigo-50 rounded-full border border-indigo-100">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </div>
                <div>
                    <h1 className="font-bold text-base text-indigo-700">{job?.company?.name}</h1>
                    <p className="text-xs text-slate-400">India</p>
                </div>
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
            <div className="flex items-center gap-4 mt-4">
                <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline" className="rounded-xl border-indigo-200 hover:bg-indigo-50 transition-all duration-300">Details</Button>
                <Button className="rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-sky-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job