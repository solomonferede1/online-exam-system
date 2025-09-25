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
        <button className="text-sm text-blue-600" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}



