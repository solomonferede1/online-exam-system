import './App.css';
import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { api } from './services/api';

function Home() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div style={{ padding: 24 }}>
      <h2>Welcome {user?.username || 'User'}</h2>
      <button onClick={logout}>Logout</button>
      <div style={{ marginTop: 16 }}>
        <button onClick={async () => alert(JSON.stringify(await api.health()))}>Ping API</button>
      </div>
    </div>
  );
}

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div>
      {isAuthenticated ? (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
