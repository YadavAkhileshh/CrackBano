import React from 'react'
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';
import { useContext } from 'react';

function DashboardLayout({ children }) {
  const { user } = useContext(UserContext);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      {user && <div className="mt-16">{children}</div>}
    </div>
  )
}

export default DashboardLayout
