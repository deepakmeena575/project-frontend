import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
                localStorage.setItem("token",res.data.token)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-gray-50 font-sans">
            <Navbar />
            <div className="flex items-center justify-center min-h-[80vh] px-2">
                <form onSubmit={submitHandler} className="w-full max-w-md bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-indigo-100">
                    <h1 className="font-extrabold text-3xl mb-8 text-indigo-700 tracking-tight text-center">Sign In</h1>
                    <div className="mb-5">
                        <Label className="text-slate-700 font-semibold">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="email"
                            className="mt-2 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-white/80 shadow-sm transition"
                        />
                    </div>
                    <div className="mb-5">
                        <Label className="text-slate-700 font-semibold">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="••••••••"
                            className="mt-2 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-white/80 shadow-sm transition"
                        />
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <RadioGroup className="flex items-center gap-6">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer accent-indigo-500"
                                />
                                <Label htmlFor="r1" className="text-slate-600">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer accent-indigo-500"
                                />
                                <Label htmlFor="r2" className="text-slate-600">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading ? (
                            <Button className="w-full py-3 rounded-xl bg-indigo-400 text-white font-bold text-lg flex items-center justify-center gap-2 shadow-md hover:bg-indigo-500 transition">
                                <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-bold text-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200">
                                Login
                            </Button>
                        )
                    }
                    <span className="block text-center text-sm mt-6 text-slate-500">Don't have an account? <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login