import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const companyArray = [];

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
        setInput({...input, companyId:selectedCompany._id});
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        
        if (!input.title || !input.description || !input.requirements || !input.location || !input.jobType || !input.experience || !input.position || !input.companyId) {
            toast.error("All fields are required.");
            return;
        }

        const parsedSalary = parseFloat(input.salary);
        if (isNaN(parsedSalary) || parsedSalary <= 0) {
            toast.error("Please enter a valid positive number for Salary.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, {
                ...input,
                salary: parsedSalary 
            },{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong!");
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-gray-50 font-sans">
            <Navbar />
            <div className="flex items-center justify-center w-full py-16 px-4">
                <form onSubmit={submitHandler} className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-100 p-10 max-w-3xl w-full">
                    <h1 className="font-extrabold text-2xl text-indigo-700 mb-8 text-center">Post a New Job</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <div>
                            <Label className="text-slate-700 font-semibold">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="mt-2 px-4 py-3 rounded-xl border border-indigo-100 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 shadow-sm transition w-full"
                            />
                        </div>
                        <div>
                            <Label className="text-slate-700 font-semibold">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="mt-2 px-4 py-3 rounded-xl border border-indigo-100 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 shadow-sm transition w-full"
                            />
                        </div>
                        <div>
                            <Label className="text-slate-700 font-semibold">Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="mt-2 px-4 py-3 rounded-xl border border-indigo-100 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 shadow-sm transition w-full"
                            />
                        </div>
                        <div>
                            <Label className="text-slate-700 font-semibold">Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="mt-2 px-4 py-3 rounded-xl border border-indigo-100 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 shadow-sm transition w-full"
                            />
                        </div>
                        <div>
                            <Label className="text-slate-700 font-semibold">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="mt-2 px-4 py-3 rounded-xl border border-indigo-100 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 shadow-sm transition w-full"
                            />
                        </div>
                        <div>
                            <Label className="text-slate-700 font-semibold">Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="mt-2 px-4 py-3 rounded-xl border border-indigo-100 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 shadow-sm transition w-full"
                            />
                        </div>
                        <div>
                            <Label className="text-slate-700 font-semibold">Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="mt-2 px-4 py-3 rounded-xl border border-indigo-100 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 shadow-sm transition w-full"
                            />
                        </div>
                        <div>
                            <Label className="text-slate-700 font-semibold">No of Position</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="mt-2 px-4 py-3 rounded-xl border border-indigo-100 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 shadow-sm transition w-full"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <div className="sm:col-span-2">
                                    <Label className="text-slate-700 font-semibold">Select Company</Label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-full mt-2 rounded-xl border border-indigo-100 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 shadow-sm transition">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    companies.map((company) => {
                                                        return (
                                                            <SelectItem value={company?.name?.toLowerCase()} key={company._id}>{company.name}</SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )
                        }
                    </div>
                    {
                        loading ? <Button className="w-full py-3 rounded-xl bg-indigo-400 text-white font-bold text-lg flex items-center justify-center gap-2 shadow-md hover:bg-indigo-500 transition"> <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-bold text-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200">Post New Job</Button>
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-rose-600 font-bold text-center my-3'>*Please register a company first, before posting a job</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob