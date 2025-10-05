import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit, FiCalendar, FiMail, FiLogOut, FiUser } from 'react-icons/fi';
import DashboardLayout from '../../components/layouts/DashboardLayout';

export default function Profile() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="card-professional overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-xl">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{user.name || 'User Profile'}</h1>
                  <p className="text-indigo-100">{user.email}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  to="/profile/edit"
                  className="btn-small bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                >
                  <FiEdit className="w-4 h-4" />
                  Edit Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-small bg-red-600/80 backdrop-blur-sm text-white border-red-500/30 hover:bg-red-600"
                >
                  <FiLogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="p-6 bg-slate-700/30 rounded-xl border border-slate-600/50">
                  <div className="flex items-center gap-3 mb-4">
                    <FiUser className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300">Full Name</label>
                      <p className="text-white font-medium">{user.name || 'Not set'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300">Email Address</label>
                      <p className="text-white font-medium">{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-6 bg-slate-700/30 rounded-xl border border-slate-600/50">
                  <div className="flex items-center gap-3 mb-4">
                    <FiCalendar className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-lg font-semibold text-white">Account Details</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300">Member Since</label>
                      <p className="text-white font-medium">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300">Account Status</label>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900/50 text-green-300 border border-green-500/30">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}