import React from "react";
import { Link } from "react-router-dom"; 
import logo from '../assets/company-logo.svg';

function Navbar({ userPic, onLogout }) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              className="h-10 w-auto"
              src={logo}
              alt="Invoice Manager Logo"
            />
            <span className="text-xl font-bold text-gray-800">
              Invoice Manager
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/email-templates"
              className="relative px-6 py-2 text-lg font-medium text-blue-600 transition duration-300 ease-in-out transform rounded-lg hover:text-white hover:bg-blue-600 overflow-hidden"
            >
              <span className="absolute inset-0 w-0 h-0 transition-all duration-500 ease-out bg-blue-400 group-hover:w-full group-hover:h-full"></span>
              <span className="relative z-10">Go to Email Templates</span>
            </Link>

            {userPic ? (
              <img
                className="h-10 w-10 rounded-full border border-gray-300 shadow-sm"
                src={userPic}
                alt="User Avatar"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-300 border border-gray-200" />
            )}
            <button
              onClick={onLogout}
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
