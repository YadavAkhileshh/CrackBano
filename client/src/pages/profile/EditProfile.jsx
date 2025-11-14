import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiUpload, FiUser, FiMail } from 'react-icons/fi';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Input from '../../components/Inputs/Input';

function EditProfile() {
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');
  const [preview, setPreview] = useState(user?.profilePicture || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Here you would typically make an API call to update the user's profile
      // For now, we'll just update the local context
      await updateUser({
        ...user,
        name,
        email,
        profilePicture: preview || user.profilePicture
      });
      
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setProfilePicture(file);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="card-professional">
          <div className="flex items-center gap-4 mb-8 p-6 border-b border-slate-200">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
            >
              <FiArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <h1 className="text-2xl font-bold text-slate-900">Edit Profile</h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 border-4 border-teal-200 flex items-center justify-center overflow-hidden">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-3xl">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-teal-600 text-white rounded-full p-3 cursor-pointer hover:bg-teal-700 transition-colors duration-200 shadow-lg">
                  <FiUpload className="w-4 h-4" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
              </div>
              <p className="text-slate-600 text-sm">Click the upload button to change your profile picture</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <Input
                    label="Full Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="Leave blank to keep current password"
                  />
                </div>
                <div>
                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EditProfile;