import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
                localStorage.removeItem("token")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className="sticky top-0 z-50 backdrop-blur bg-white/80 shadow-md border-b border-indigo-100 font-sans">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-indigo-700">Job<span className="text-sky-500">Portal</span></h1>
                </div>
                <div className="flex items-center gap-12">
                    <ul className="flex font-semibold items-center gap-6 text-slate-700">
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className="hover:text-indigo-500 transition-colors">Companies</Link></li>
                                    <li><Link to="/admin/jobs" className="hover:text-indigo-500 transition-colors">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className="hover:text-indigo-500 transition-colors">Home</Link></li>
                                    <li><Link to="/jobs" className="hover:text-indigo-500 transition-colors">Jobs</Link></li>
                                    <li><Link to="/browse" className="hover:text-indigo-500 transition-colors">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className="flex items-center gap-2">
                                <Link to="/login"><Button variant="outline" className="rounded-xl border-indigo-200 hover:bg-indigo-50 transition">Login</Button></Link>
                                <Link to="/signup"><Button className="rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white font-semibold shadow-md transition">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer ring-2 ring-indigo-200">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 rounded-2xl shadow-xl border-indigo-100">
                                    <div className="">
                                        <div className="flex gap-2 space-y-2 items-center">
                                            <Avatar className="cursor-pointer ring-2 ring-indigo-200">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className="font-bold text-indigo-700">{user?.fullname}</h4>
                                                <p className="text-sm text-slate-500">{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col my-2 text-slate-600">
                                            {
                                                user && user.role && (
                                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                        <User2 />
                                                        <Button variant="link" className="text-indigo-600 font-semibold"><Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }
                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link" className="text-rose-500 font-semibold">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar