import React, { useState, useRef, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiEdit, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { useContext } from 'react';

function ProfileInfoCard() {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    localStorage.removeItem('token');
    clearUser();
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 focus:outline-none group hover:opacity-90 transition-opacity duration-200"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 border-2 border-teal-500 shadow-lg flex items-center justify-center group-hover:shadow-teal-500/50 group-hover:scale-110 transition-all duration-300">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-white font-semibold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          )}
        </div>
        <span className="hidden md:inline-block font-medium text-slate-700 group-hover:text-teal-600 transition-colors duration-200">
          {user.name || "User"}
        </span>
        <FiChevronDown className={`text-slate-600 transition-all duration-300 group-hover:text-teal-600 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 card-professional py-2 z-50 shadow-xl animate-fade-in-up">
          <div className="px-4 py-3 border-b border-slate-200">
            <p className="text-sm font-semibold text-slate-800">{user.name}</p>
            <p className="text-xs text-slate-600 truncate">{user.email}</p>
          </div>
          
          <div className="py-1">
            <Link
              to="/profile"
              className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-600 transition-all duration-200 rounded-lg mx-2 group"
              onClick={() => setIsOpen(false)}
            >
              <FiUser className="mr-3 w-4 h-4 group-hover:scale-110 transition-transform duration-200" /> My Profile
            </Link>
            
            <Link
              to="/profile/edit"
              className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 rounded-lg mx-2 group"
              onClick={() => setIsOpen(false)}
            >
              <FiEdit className="mr-3 w-4 h-4 group-hover:scale-110 transition-transform duration-200" /> Edit Profile
            </Link>
          </div>
          
          <div className="border-t border-slate-200 mt-1 pt-1">
            <div className="px-2">
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 rounded-lg border border-transparent hover:border-red-200 group"
              >
                <FiLogOut className="mr-3 w-4 h-4 group-hover:scale-110 transition-transform duration-200" /> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileInfoCard;