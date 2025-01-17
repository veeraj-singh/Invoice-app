import React from "react";

function Navbar({ userPic, onLogout }) {
  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <img className="h-8 w-auto" src="/logo.svg" alt="Company Logo" />
          </div>
          <div className="flex items-center">
            {userPic ? (
              <img
                className="h-8 w-8 rounded-full"
                src={userPic}
                alt="User Avatar"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-300" />
            )}
            <button
              onClick={onLogout}
              className="ml-4 text-sm font-medium text-gray-700 hover:text-gray-900"
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
