/**
 * Simple login form component.
 *
 * On submit calls the AuthContext `login` and displays inline error on failure.
 * Used on the root route when unauthenticated.
 */
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login, loading } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: '64px auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%' }} />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
    </div>
  );
}


