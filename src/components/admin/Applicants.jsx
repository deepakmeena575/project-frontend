import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicantsForRecruiter } from '@/redux/applicationSlice';

const Applicants = () => {
    
    const dispatch = useDispatch();
    const {allApplicantsForRecruiter} = useSelector(store=>store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/getallapplications`, { withCredentials: true });
                dispatch(setAllApplicantsForRecruiter(res.data.applications));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [dispatch]); 
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-gray-50 font-sans">
            <Navbar />
            <div className="max-w-7xl mx-auto py-12 px-4">
                <h1 className="font-extrabold text-2xl text-indigo-700 mb-8">All Applications <span className="text-slate-500 font-normal">({allApplicantsForRecruiter?.length})</span></h1>
                <ApplicantsTable applications={allApplicantsForRecruiter} />
            </div>
        </div>
    )
}

export default Applicants