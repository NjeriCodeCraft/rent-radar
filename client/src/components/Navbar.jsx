import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary-600">Rent Radar</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/app" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
              Search
            </Link>
            {!isAuthenticated && (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/register" className="text-primary-600 border border-primary-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-50">
                  Register
                </Link>
              </>
            )}
            {isAuthenticated && (
              <>
                {user?.role === 'agent' && (
                  <Link to="/agent/dashboard" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                    Agent Dashboard
                  </Link>
                )}
                {user?.role !== 'agent' && (
                  <Link to="/agent/register" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                    Become an Agent
                  </Link>
                )}
                <span className="text-gray-700 font-semibold px-3 py-2 text-sm">Hi, {user?.name?.split(' ')[0]}</span>
                <button
                  onClick={handleLogout}
                  className="text-white bg-primary-600 hover:bg-primary-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 