import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-blue-100 text-blue-600'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  );
};

const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M3 10h18M3 6h18M3 14h18M3 18h18"></path>
  </svg>
);

const ExamsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
  </svg>
);

const ResultsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z"></path>
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
  </svg>
);

const ProfileIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
  </svg>
);

const getNavLinks = (role) => {
  const allLinks = {
    ADMIN: [
      { to: '/admin', icon: <DashboardIcon />, label: 'Dashboard' },
      { to: '/admin/exams', icon: <ExamsIcon />, label: 'Exams' },
      { to: '/admin/results', icon: <ResultsIcon />, label: 'Results' },
      { to: '/admin/users', icon: <UsersIcon />, label: 'Users' },
      { to: '/admin/settings', icon: <SettingsIcon />, label: 'Settings' },
    ],
    INSTRUCTOR: [
      { to: '/instructor', icon: <DashboardIcon />, label: 'Dashboard' },
      { to: '/instructor/exams', icon: <ExamsIcon />, label: 'My Exams' },
      { to: '/instructor/results', icon: <ResultsIcon />, label: 'Results' },
    ],
    STUDENT: [
      { to: '/student', icon: <DashboardIcon />, label: 'Dashboard' },
      { to: '/student/results', icon: <ResultsIcon />, label: 'My Results' },
      { to: '/student/profile', icon: <ProfileIcon />, label: 'Profile' },
    ],
    DEPARTMENT_HEAD: [
      { to: '/department', icon: <DashboardIcon />, label: 'Dashboard' },
      { to: '/department/results', icon: <ResultsIcon />, label: 'Department Results' },
    ],
    HR: [
      { to: '/hr', icon: <DashboardIcon />, label: 'Dashboard' },
      { to: '/hr/results', icon: <ResultsIcon />, label: 'Export Results' },
    ],
  };

  return allLinks[role] || [];
};

export default function Sidebar({ open }) {
  const { user } = useContext(AuthContext);
  const role = user?.profile?.role;
  const navLinks = getNavLinks(role);

  return (
    <aside
      className={`fixed top-14 left-0 h-[calc(100vh-56px)] bg-white border-r transition-all ${
        open ? 'w-64' : 'w-16'
      }`}
    >
      <nav className="p-3 space-y-2">
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to}>
            {link.icon}
            {open && <span className="truncate">{link.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}



