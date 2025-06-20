import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="w-full bg-gradient-to-br from-indigo-100 via-sky-100 to-gray-50 py-24 font-sans text-center">
            <div className="max-w-4xl mx-auto px-4">
                <span className="inline-block px-6 py-2 rounded-full bg-sky-100 text-sky-600 font-semibold text-base shadow-md mb-4 animate-fade-in-down">No. 1 Job Hunt Website</span>
                <h1 className="text-6xl sm:text-7xl font-extrabold leading-tight text-indigo-800 mb-6 animate-fade-in-up">
                    Search, Apply & <br className="hidden sm:inline"/> <span className="text-sky-600">Get Your Dream Jobs</span>
                </h1>
                <p className="text-xl text-slate-700 mb-10 animate-fade-in-up delay-200">Discover thousands of opportunities and land your perfect job with ease.</p>
                <div className="flex w-full max-w-2xl mx-auto shadow-2xl border border-indigo-100 pl-6 rounded-full items-center bg-white/80 backdrop-blur-lg transform transition-all duration-300 hover:scale-[1.01] hover:shadow-3xl animate-fade-in-up delay-400">
                    <input
                        type="text"
                        placeholder="Find your dream jobs..."
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full bg-transparent py-4 text-lg text-slate-800 placeholder-slate-400 focus:placeholder-slate-300"
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-gradient-to-r from-indigo-600 to-sky-600 text-white px-8 py-5 font-bold text-xl shadow-lg hover:from-indigo-700 hover:to-sky-700 transition-all duration-300 transform hover:scale-105 group">
                        <Search className="h-6 w-6 mr-2 group-hover:rotate-6 transition-transform" /> Search
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection