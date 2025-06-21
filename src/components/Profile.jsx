import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'


const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div className="min-h-[80vh] bg-gradient-to-br from-indigo-100 via-sky-100 to-gray-50 py-12 font-sans">
            <div className='max-w-4xl mx-auto'>
                <div className='bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-100 p-10 mb-8'>
                    <div className='flex justify-between items-start mb-6'>
                        <div className='flex items-center gap-6'>
                            <div className="w-28 h-28 rounded-full bg-indigo-100 border-4 border-indigo-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                                {user?.profile?.profilePhoto ? (
                                    <Avatar className="h-full w-full">
                                        <AvatarImage src={user.profile.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                    </Avatar>
                                ) : (
                                    <span className="text-4xl text-indigo-400 font-bold">{user?.fullname[0]}</span>
                                )}
                            </div>
                            <div>
                                <h1 className='font-extrabold text-3xl text-indigo-700 mb-1'>{user?.fullname}</h1>
                                <p className='text-slate-600 text-lg'>{user?.profile?.bio || "No bio available"}</p>
                            </div>
                        </div>
                        <Button onClick={() => setOpen(true)} className="text-right bg-indigo-500 text-white hover:bg-indigo-600 rounded-lg shadow-md transition-all duration-200" variant="default"><Pen className="h-5 w-5"/></Button>
                    </div>
                    
                    <div className='border-t border-indigo-100 pt-6 mt-6'>
                        <h2 className='font-semibold text-xl text-indigo-600 mb-4'>Contact Information</h2>
                        <div className='flex items-center gap-3 my-2 text-slate-700'>
                            <Mail className="h-5 w-5 text-sky-500" />
                            <span>{user?.email}</span>
                        </div>
                        <div className='flex items-center gap-3 my-2 text-slate-700'>
                            <Contact className="h-5 w-5 text-sky-500" />
                            <span>{user?.phoneNumber || "N/A"}</span>
                        </div>
                    </div>

                    {
                        user && user.role === 'student' && (
                            <div className='border-t border-indigo-100 pt-6 mt-6'>
                                <h2 className='font-semibold text-xl text-indigo-600 mb-4'>Skills</h2>
                                <div className='flex flex-wrap items-center gap-2'>
                                    {
                                        user?.profile?.skills && user?.profile?.skills.length > 0 ? 
                                        user.profile.skills.map((item, index) => <Badge key={index} className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full font-medium shadow-sm hover:bg-sky-200 transition">{item}</Badge>) : 
                                        <span className="text-slate-500">No skills added yet.</span>
                                    }
                                </div>
                            </div>
                        )
                    }

                    {
                        user && user.role === 'student' && (
                            <div className='border-t border-indigo-100 pt-6 mt-6'>
                                <h2 className="text-xl font-semibold text-indigo-600 mb-4">Resume</h2>
                                <div className='grid w-full max-w-sm items-center gap-1.5'>
                                    {
                                        user?.profile?.resume ? 
                                        (<a target='_blank' href={user.profile.resume} rel="noopener noreferrer" className='text-indigo-600 font-semibold hover:underline cursor-pointer flex items-center gap-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-9 6h6m-3 6a2.25 2.25 0 0 1-2.25-2.25V9.75a2.25 2.25 0 0 1 2.25-2.25h.75m-3 4.5H9a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 1 2.25-2.25h.75m-3 4.5H15M9 12H7.5a2.25 2.25 0 0 0-2.25 2.25V17.25m2.25-4.5H15M12 18.75V21M17.25 12V21" />
                                            </svg>
                                            View Resume
                                        </a>) : 
                                        <span className="text-slate-500">No resume uploaded yet.</span>
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>

                {
                    user && user.role === 'student' && (
                        <div className='bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-100 p-10'>
                            <h1 className='font-extrabold text-2xl text-indigo-700 mb-6'>Applied Jobs</h1>
                            <AppliedJobTable />
                        </div>
                    )
                }
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile