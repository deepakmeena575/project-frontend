import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])
    return (
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-100 p-8 font-sans">
            <Table>
                <TableCaption className="text-slate-500 mb-4">A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow className="bg-indigo-50">
                        <TableHead className="text-indigo-700 font-bold text-base">Logo</TableHead>
                        <TableHead className="text-indigo-700 font-bold text-base">Name</TableHead>
                        <TableHead className="text-indigo-700 font-bold text-base">Date</TableHead>
                        <TableHead className="text-right text-indigo-700 font-bold text-base">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            <tr className="hover:bg-indigo-50/60 transition-colors duration-200" key={company._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo}/>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="text-slate-700 font-semibold">{company.name}</TableCell>
                                <TableCell className="text-slate-500">{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal className="text-indigo-400 hover:text-indigo-700 transition-colors" /></PopoverTrigger>
                                        <PopoverContent className="w-36 rounded-xl shadow-lg border-indigo-100 p-1">
                                            <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-full cursor-pointer hover:bg-indigo-50 px-2 py-1 rounded transition-colors'>
                                                <Edit2 className='w-4 text-sky-600' />
                                                <span className="text-slate-700 font-medium">Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable