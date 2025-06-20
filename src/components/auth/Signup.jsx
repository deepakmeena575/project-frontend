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
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
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
                <form onSubmit={submitHandler} className="w-full max-w-lg bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-indigo-100">
                    <h1 className="font-extrabold text-3xl mb-8 text-indigo-700 tracking-tight text-center">Sign Up</h1>
                    <div className="mb-5">
                        <Label className="text-slate-700 font-semibold">Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Name"
                            className="mt-2 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-white/80 shadow-sm transition"
                        />
                    </div>
                    <div className="mb-5">
                        <Label className="text-slate-700 font-semibold">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="email
                            "
                            className="mt-2 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-white/80 shadow-sm transition"
                        />
                    </div>
                    <div className="mb-5">
                        <Label className="text-slate-700 font-semibold">Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="8080808080"
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
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
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
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Label className="text-slate-700 font-semibold">Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            />
                        </div>
                    </div>
                    {
                        loading ? (
                            <Button className="w-full py-3 rounded-xl bg-indigo-400 text-white font-bold text-lg flex items-center justify-center gap-2 shadow-md hover:bg-indigo-500 transition">
                                <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-bold text-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200">
                                Signup
                            </Button>
                        )
                    }
                    <span className="block text-center text-sm mt-6 text-slate-500">Already have an account? <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup