import React from 'react'
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';
import { useContext } from 'react';

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <Navbar />
      <div>{children}</div>
    </div>
  )
}

export default DashboardLayout
