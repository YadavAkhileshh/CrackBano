// src/components/PrivateRoute.jsx
// import { Navigate, Outlet } from 'react-router-dom';
// import { getToken } from '../utils/auth';
// // You'll need to implement this

// const PrivateRoute = () => {
//   const isAuthenticated = !!getToken(); // Check if user is authenticated
  
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;


import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/userContext';

export default function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}