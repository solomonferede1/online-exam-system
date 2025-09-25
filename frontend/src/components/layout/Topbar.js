import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Topbar({ onToggle }) {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <button className="p-2 rounded hover:bg-gray-100" onClick={onToggle}>
          ☰
        </button>
        <div className="flex items-center gap-2">
          {/* You can replace this with your logo */}
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v11.494m-9-5.747h18"
            ></path>
          </svg>
          <h1 className="text-lg font-bold">Online Exam System</h1>
        </div>
      </div>
      <div className="relative">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setDropdownOpen((v) => !v)}
        >
          {/* You can replace this with a user avatar */}
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          <span className="text-sm text-gray-600">{user?.username}</span>
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
            <Link
              to="/student/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}



