import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ open }) {
  return (
    <aside className={`fixed top-14 left-0 h-[calc(100vh-56px)] bg-white border-r transition-all ${open ? 'w-64' : 'w-16'}`}>
      <nav className="p-3 space-y-2">
        <Link className="block text-sm text-gray-700 hover:text-blue-600" to="/exams">Exams</Link>
        <Link className="block text-sm text-gray-700 hover:text-blue-600" to="/">Home</Link>
      </nav>
    </aside>
  );
}



