import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <div style={{ padding: 24 }}>Please log in to continue.</div>;
  }
  return children;
}


