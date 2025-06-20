import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import UpdateRecruiterDialog from './UpdateRecruiterDialog'

const RecruiterProfile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    console.log("RecruiterProfile: user.profile.profilePhoto", user?.profile?.profilePhoto);

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
                        <div className='flex items-center gap-3 my-2 text-slate-700'>
                            <span className="text-sky-500 font-semibold">Company:</span>
                            <span>{user?.company || "No company assigned"}</span>
                        </div>
                    </div>

                    <div className='border-t border-indigo-100 pt-6 mt-6'>
                        <h2 className='font-semibold text-xl text-indigo-600 mb-4'>Recruiter Role / Department</h2>
                        <div className='flex flex-wrap items-center gap-2'>
                            {user?.profile?.roles && user.profile.roles.length > 0 ?
                                user.profile.roles.map((role, index) => (
                                    <Badge key={index} className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full font-medium shadow-sm hover:bg-sky-200 transition">
                                        {role}
                                    </Badge>
                                )) :
                                <span className="text-slate-500">No roles added yet.</span>
                            }
                        </div>
                    </div>
                </div>

                {/**/}

                <UpdateRecruiterDialog open={open} setOpen={setOpen} />
            </div>
        </div>
    )
}

export default RecruiterProfile
