import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import useGetAllJobs from '@/hooks/useGetAllJobs';



const Jobs = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-gray-50 font-sans">
            <Navbar />
            <div className="max-w-7xl mx-auto mt-8 px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4 w-full mb-6 md:mb-0">
                        <FilterCard />
                    </div>
                    {
                        allJobs.length <= 0 ? <span className="text-slate-500 text-lg">Job not found</span> : (
                            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {
                                        allJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 40 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -40 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs