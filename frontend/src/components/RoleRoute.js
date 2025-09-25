import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function RoleRoute({ roles = [], children }) {
  const { user } = useContext(AuthContext);
  const role = user?.profile?.role;
  if (roles.length && !roles.includes(role)) {
    return <div className="p-6">You do not have access to this page.</div>;
  }
  return children;
}


