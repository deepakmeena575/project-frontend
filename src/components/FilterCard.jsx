import React, { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select"
import axios from "axios";

const filterData = [
    {
        filterType: "Job Type",
        key: "jobType",
        options: ["Full-time", "Part-time", "Remote", "Internship"]
    },
    {
        filterType: "Location",
        key: "location",
        options: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Salary",
        key: "salary",
        options: ["0-40k", "42-1lakh", "1lakh to 5lakh", "5lakh+"]
    },
    {
        filterType: "Experience Level",
        key: "experienceLevel",
        options: ["Fresher", "1-2 years", "3-5 years", "5+ years"]
    },
];

const FilterCard = () => {
    const [filterState, setFilterState] = useState({});
    const [companies, setCompanies] = useState([]);
    const dispatch = useDispatch();

    
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get("/api/v1/company/getall"); 
                console.log("API Response for companies:", res.data);
                setCompanies(res.data.companies.map(company => company.companyName)); 
            } catch (error) {
                console.error("Failed to fetch companies:", error);
            }
        };
        fetchCompanies();
    }, []);

    const changeHandler = (key, value) => {
        setFilterState(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const resetFilters = () => {
        setFilterState({});
    };

    useEffect(() => {
        const queryParams = new URLSearchParams();
        for (const key in filterState) {
            if (filterState[key]) {
                queryParams.append(key, filterState[key]);
            }
        }
        dispatch(setSearchedQuery(queryParams.toString()));
    }, [filterState, dispatch]);

    return (
        <div className="w-full bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-indigo-100 font-sans">
            <h1 className="font-extrabold text-2xl text-indigo-700 mb-6">Filter Jobs</h1>
            <hr className="mb-6 border-indigo-200" />
            
            {filterData.map((data) => (
                <div key={data.key} className="mb-7 last:mb-0">
                    <Label htmlFor={data.key} className="font-bold text-lg text-slate-800 mb-3 block">{data.filterType}</Label>
                    <Select value={filterState[data.key] || ''} onValueChange={(value) => changeHandler(data.key, value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={`Select a ${data.filterType}`} />
                        </SelectTrigger>
                        <SelectContent>
                            {data.options.map((item, idx) => (
                                <SelectItem key={idx} value={item}>{item}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            ))}

            {}
            <div className="mb-7 last:mb-0">
                <Label htmlFor="company" className="font-bold text-lg text-slate-800 mb-3 block">Company</Label>
                <Select value={filterState["company"] || ''} onValueChange={(value) => changeHandler("company", value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Company" />
                    </SelectTrigger>
                    <SelectContent>
                        {companies.map((companyName, idx) => (
                            <SelectItem key={idx} value={companyName}>{companyName}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="mt-8">
                <button 
                    onClick={resetFilters}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Reset Filters
                </button>
            </div>
        </div>
    );
};

export default FilterCard;