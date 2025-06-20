import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); 
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); 
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) 
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md'>
            {/* Job Header */}
            <div className='flex justify-between items-start mb-6'>
                <div>
                    <h1 className='text-3xl font-extrabold text-gray-900'>{singleJob?.title}</h1>
                    {/**/}
                    <div className='flex items-center gap-2 text-gray-600 mt-2'>
                        {/**/}
                        {singleJob?.company?.logoUrl && <img src={singleJob.company.logoUrl} alt="Company Logo" className="w-8 h-8 rounded-full" />}
                        <p className='text-lg font-semibold'>{singleJob?.company?.name}</p>
                        {singleJob?.company?.location && <span className='text-sm text-gray-500'>- {singleJob.company.location}</span>}
                    </div>
                    {/**/}
                    <div className='flex flex-wrap items-center gap-2 mt-4'>
                        <Badge className={'bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full'}>{singleJob?.position} Positions</Badge>
                        <Badge className={'bg-red-100 text-[#F83002] font-bold px-3 py-1 rounded-full'}>{singleJob?.jobType}</Badge>
                        <Badge className={'bg-purple-100 text-[#7209b7] font-bold px-3 py-1 rounded-full'}>{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                {/**/}
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-200 ${isApplied ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            {/**/}
            <div className='mb-6'>
                <h2 className='text-2xl font-bold border-b-2 border-gray-200 pb-3 mb-4 text-gray-800'>Job Description</h2>
                <p className='text-gray-700 leading-relaxed'>{singleJob?.description}</p>
            </div>

            {/**/}
            <div className='mb-6'>
                <h2 className='text-2xl font-bold border-b-2 border-gray-200 pb-3 mb-4 text-gray-800'>Job Details</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <p className='font-semibold text-gray-800'>Role: <span className='font-normal text-gray-700'>{singleJob?.title}</span></p>
                    <p className='font-semibold text-gray-800'>Location: <span className='font-normal text-gray-700'>{singleJob?.location}</span></p>
                    <p className='font-semibold text-gray-800'>Experience: <span className='font-normal text-gray-700'>{singleJob?.experience} yrs</span></p>
                    <p className='font-semibold text-gray-800'>Salary: <span className='font-normal text-gray-700'>{singleJob?.salary}LPA</span></p>
                    <p className='font-semibold text-gray-800'>Total Applicants: <span className='font-normal text-gray-700'>{singleJob?.applications?.length}</span></p>
                    <p className='font-semibold text-gray-800'>Posted Date: <span className='font-normal text-gray-700'>{singleJob?.createdAt ? singleJob.createdAt.split("T")[0] : 'N/A'}</span></p>
                </div>
            </div>

            {/**/}
            {singleJob?.company && (
                <div className='mb-6'>
                    <h2 className='text-2xl font-bold border-b-2 border-gray-200 pb-3 mb-4 text-gray-800'>Company Details</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <p className='font-semibold text-gray-800'>Company Name: <span className='font-normal text-gray-700'>{singleJob.company.name}</span></p>
                        <p className='font-semibold text-gray-800'>Company Location: <span className='font-normal text-gray-700'>{singleJob.company.location}</span></p>
                        {singleJob.company.website && <p className='font-semibold text-gray-800'>Website: <a href={singleJob.company.website} target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:underline'>{singleJob.company.website}</a></p>}
                        {singleJob.company.description && <p className='font-semibold text-gray-800 col-span-full'>About: <span className='font-normal text-gray-700'>{singleJob.company.description}</span></p>}
                    </div>
                </div>
            )}
        </div>
    )
}

export default JobDescription