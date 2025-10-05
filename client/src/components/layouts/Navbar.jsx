import React from 'react'
import ProfileInfoCard from '../Cards/ProfileInfoCard'
import { Link } from 'react-router-dom'
import { FiTarget, FiBriefcase, FiMic } from 'react-icons/fi'

function Navbar() {
  return (
    <div className="h-18 bg-slate-900/95 border-b border-slate-700/50 backdrop-blur-md py-3 px-4 md:px-6 sticky top-0 z-50 shadow-lg shadow-slate-900/50">
        <div className="container mx-auto flex items-center justify-between gap-5">
            <Link to="/dashboard" className="flex items-center gap-3 group">
                <div className="p-2 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg group-hover:shadow-lg group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <FiBriefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-green-300 transition-all duration-300">
                        CrackBano
                    </h2>
                    <p className="text-xs text-slate-400 -mt-1 group-hover:text-slate-300 transition-colors duration-300">Professional Interview Prep</p>
                </div>
            </Link>

            <ProfileInfoCard/>
        </div>
    </div>
  )
}

export default Navbar
