import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Sidebar({ open }) {
  const { user } = useContext(AuthContext);
  const role = user?.profile?.role;

  return (
    <aside className={`fixed top-14 left-0 h-[calc(100vh-56px)] bg-white border-r transition-all ${open ? 'w-64' : 'w-16'}`}>
      <nav className="p-3 space-y-4 text-sm">
        <div>
          <div className="uppercase text-gray-500 mb-2">General</div>
          <Link className="block text-gray-700 hover:text-blue-600" to="/exams">Exams</Link>
        </div>

        {(role === 'ADMIN') && (
          <div>
            <div className="uppercase text-gray-500 mb-2">Admin</div>
            <Link className="block text-gray-700 hover:text-blue-600" to="/admin">Dashboard</Link>
            <Link className="block text-gray-700 hover:text-blue-600" to="/admin/users">Users</Link>
            <Link className="block text-gray-700 hover:text-blue-600" to="/admin/exams">Exams</Link>
            <Link className="block text-gray-700 hover:text-blue-600" to="/admin/results">Results</Link>
            <Link className="block text-gray-700 hover:text-blue-600" to="/admin/settings">Settings</Link>
          </div>
        )}

        {(role === 'ADMIN' || role === 'INSTRUCTOR') && (
          <div>
            <div className="uppercase text-gray-500 mb-2">Instructor</div>
            <Link className="block text-gray-700 hover:text-blue-600" to="/instructor">Dashboard</Link>
            <Link className="block text-gray-700 hover:text-blue-600" to="/instructor/exams">My Exams</Link>
            <Link className="block text-gray-700 hover:text-blue-600" to="/instructor/results">Results</Link>
          </div>
        )}

        {(role === 'ADMIN' || role === 'STUDENT') && (
          <div>
            <div className="uppercase text-gray-500 mb-2">Student</div>
            <Link className="block text-gray-700 hover:text-blue-600" to="/student">Dashboard</Link>
            <Link className="block text-gray-700 hover:text-blue-600" to="/student/results">My Results</Link>
            <Link className="block text-gray-700 hover:text-blue-600" to="/student/profile">Profile</Link>
          </div>
        )}
      </nav>
    </aside>
  );
}



