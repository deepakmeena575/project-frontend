import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-gray-50 font-sans">
            <Navbar />
            <div className="max-w-2xl mx-auto py-16 px-4">
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-100 p-10 flex flex-col items-center">
                    <div className="mb-8 text-center">
                        <h1 className="font-extrabold text-2xl text-indigo-700 mb-2">Your Company Name</h1>
                        <p className="text-slate-500">What would you like to give your company name? You can change this later.</p>
                    </div>
                    <div className="w-full mb-8">
                        <Label className="text-slate-700 font-semibold">Company Name</Label>
                        <Input
                            type="text"
                            className="mt-2 px-4 py-3 rounded-xl border border-indigo-100 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 shadow-sm transition w-full"
                            placeholder="JobHunt, Microsoft etc."
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-4 w-full justify-end">
                        <Button variant="outline" onClick={() => navigate("/admin/companies")}
                            className="rounded-xl border-indigo-200 hover:bg-indigo-50 transition px-8 py-3 text-lg">Cancel</Button>
                        <Button onClick={registerNewCompany}
                            className="rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-sky-600 transition px-8 py-3 text-lg">Continue</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate