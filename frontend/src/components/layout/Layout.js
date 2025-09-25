import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout({ children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar onToggle={() => setOpen((v) => !v)} />
      <div className="flex">
        <Sidebar open={open} />
        <main className={`flex-1 p-6 transition-all ${open ? 'ml-64' : 'ml-16'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}



