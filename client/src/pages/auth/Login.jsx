import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/userContext';
import Input from '../../components/Inputs/Input';
import { toast } from 'react-hot-toast';

function Login({ setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      toast.error('Please enter both email and password');
      return;
    }

    try {
      setIsLoading(true);
      const success = await login(email, password);
      
      if (success) {
        setEmail('');
        setPassword('');
        // Navigation is handled by the auth context
      }
    } catch (error) {
      console.error('Login error:', error);
      // Error is already handled by the auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('signup');
    } else {
      const searchParams = new URLSearchParams(location.search);
      const redirect = searchParams.get('redirect');
      navigate(redirect ? `/signup?redirect=${encodeURIComponent(redirect)}` : '/signup');
    }
  };

  return (
    <div className="w-full max-w-md p-8 flex flex-col justify-center animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-200 hover:scale-110 transition-transform duration-300">
            <span className="text-2xl">🚀</span>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h3>
        <p className="text-slate-600">Sign in to your CrackBano account</p>
      </div>

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div className="mb-6">
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </>
          ) : (
            <>
              <span>🔑</span>
              Login
            </>
          )}
        </button>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={handleSignupClick}
            className="text-teal-600 hover:text-teal-700 font-semibold transition-all duration-200 hover:scale-105 hover:underline underline-offset-2"
            disabled={isLoading}
          >
            Create Account
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
