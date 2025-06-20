import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';



const Browse = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-gray-50 font-sans">
            <Navbar />
            <div className="max-w-7xl mx-auto my-12 px-4">
                <h1 className="font-extrabold text-2xl text-indigo-700 mb-10">Search Results <span className="text-slate-500 font-normal">({allJobs.length})</span></h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse