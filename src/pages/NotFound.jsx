import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import { Button } from '../components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-sky-100 to-gray-50 font-sans">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-100 p-10 text-center max-w-xl w-full">
          <h1 className="text-7xl font-extrabold text-indigo-700 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-slate-700 mb-4">Page Not Found</h2>
          <p className="text-slate-600 mb-8">Oops! The page you're looking for doesn't exist or has been moved.</p>
          <Link to="/">
            <Button className="rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-bold text-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200 px-8 py-3">
              Go to Homepage
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound; 