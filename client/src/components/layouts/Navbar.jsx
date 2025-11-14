import React from 'react'
import ProfileInfoCard from '../Cards/ProfileInfoCard'
import { Link } from 'react-router-dom'
import { FiTarget, FiBriefcase, FiMic } from 'react-icons/fi'

function Navbar() {
  return (
    <div className="h-18 bg-white/95 border-b border-slate-200 backdrop-blur-md py-3 px-4 md:px-6 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex items-center justify-between gap-5">
            <Link to="/dashboard" className="flex items-center gap-3 group">
                <div className="p-2 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg group-hover:shadow-lg group-hover:shadow-teal-500/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <FiBriefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent group-hover:from-teal-700 group-hover:to-cyan-700 transition-all duration-300">
                        CrackBano
                    </h2>
                    <p className="text-xs text-slate-600 -mt-1 group-hover:text-slate-700 transition-colors duration-300">Professional Interview Prep</p>
                </div>
            </Link>

            <ProfileInfoCard/>
        </div>
    </div>
  )
}

export default Navbar
