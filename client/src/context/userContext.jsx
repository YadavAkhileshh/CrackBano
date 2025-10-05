// In userContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { axiosInstance, setAuthToken } from "../utils/axiosInstance";
import { API_PATHS } from '../utils/apiPaths';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await fetchUserData();
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          setAuthError(error.message);
          // Clear invalid token
          setAuthToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
      
      // Handle different response formats
      let userData;
      if (response.data) {
        userData = response.data.user || response.data;
      } else {
        userData = response;
      }
  
      if (!userData) {
        throw new Error('No user data received');
      }
  
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Clear invalid token if the error is 401
      if (error.response?.status === 401) {
        setAuthToken(null);
      }
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      setAuthError(null);
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
      
      // Handle different response structures
      const responseData = response.data || response;
      
      // Check if we have a token and user data in the response
      const token = responseData.token || (responseData.data && responseData.data.token);
      const userData = responseData.user || (responseData.data && responseData.data.user) || responseData.data;
      
      if (!token) {
        throw new Error('No authentication token received');
      }
      
      if (!userData) {
        console.warn('No user data received in login response, will fetch from /me endpoint');
      }
      
      // Store token first
      setAuthToken(token);
      
      // If we have user data, use it, otherwise fetch it
      if (userData && userData._id) {
        setUser(userData);
      } else {
        // Fetch user data if not provided in login response
        try {
          const userResponse = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
          const userFromProfile = userResponse.data?.user || userResponse.data || userResponse;
          if (userFromProfile) {
            setUser(userFromProfile);
          }
        } catch (profileError) {
          console.error('Error fetching user profile:', profileError);
          // Don't fail login if profile fetch fails
        }
      }
      
      toast.success('Logged in successfully!');

      // Redirect to dashboard or previous location
      const searchParams = new URLSearchParams(location.search);
      const redirectTo = searchParams.get('redirect') || '/dashboard';
      navigate(redirectTo);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.response) {
        // Handle HTTP error responses
        if (error.response.status === 401) {
          errorMessage = 'Invalid email or password';
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setAuthError(errorMessage);
      toast.error(errorMessage);
      return false;
    }
  };

  const logout = () => {
    // Clear user data and token
    setUser(null);
    setAuthToken(null);
    setAuthError(null);
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  // Update user data
  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  const value = {
    user,
    isLoading,
    authError,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
    refreshUser: fetchUserData,
  };

  return (
    <UserContext.Provider value={value}>
      {!isLoading ? children : (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
};