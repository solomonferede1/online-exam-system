import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Welcome, {user?.username}!</h2>
      <p className="text-gray-600">Select an option from the sidebar to get started.</p>
    </div>
  );
}
