import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const {singleCompany} = useSelector(store=>store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const res = await axios.put(
                `${COMPANY_API_END_POINT}/update/${params.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`  // ✅ Add Bearer token here
                    },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    },[singleCompany]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-gray-50 font-sans">
            <Navbar />
            <div className="max-w-2xl mx-auto py-16 px-4">
                <form onSubmit={submitHandler} className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-100 p-10">
                    <div className="flex items-center gap-5 mb-8">
                        <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-slate-500 font-semibold rounded-xl border-indigo-200 hover:bg-indigo-50 transition px-6 py-2">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className="font-extrabold text-2xl text-indigo-700">Company Setup</h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <div>
                            <Label className="text-slate-700 font-semibold">Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
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
                            <Label className="text-slate-700 font-semibold">Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
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
                        <div className="sm:col-span-2">
                            <Label className="text-slate-700 font-semibold">Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="mt-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 w-full"
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full py-3 rounded-xl bg-indigo-400 text-white font-bold text-lg flex items-center justify-center gap-2 shadow-md hover:bg-indigo-500 transition"> <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-bold text-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200">Update</Button>
                    }
                </form>
            </div>
        </div>
    )
}

export default CompanySetup