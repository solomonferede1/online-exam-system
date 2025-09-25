import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Topbar({ onToggle }) {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-4">
      <button className="p-2 rounded hover:bg-gray-100" onClick={onToggle}>
        ☰
      </button>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.username}</span>
        <a className="text-sm text-gray-700 hover:text-blue-600" href="/exams">Exams</a>
        <a className="text-sm text-gray-700 hover:text-blue-600" href="/student">Student</a>
        <a className="text-sm text-gray-700 hover:text-blue-600" href="/instructor">Instructor</a>
        <a className="text-sm text-gray-700 hover:text-blue-600" href="/admin">Admin</a>
        <button className="text-sm text-blue-600" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}



