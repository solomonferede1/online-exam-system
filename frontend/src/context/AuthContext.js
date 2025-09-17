import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { api, setAuthTokens, clearAuthTokens, getAuthToken } from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() => getAuthToken());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const isAuthenticated = !!accessToken;

  const login = useCallback(async (username, password) => {
    setLoading(true);
    try {
      const tokens = await api.login({ username, password });
      setAuthTokens(tokens);
      setAccessToken(tokens.access);
      try { setUser(await api.me()); } catch { setUser({ username }); }
      return true;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    const refresh = localStorage.getItem('refresh_token');
    if (refresh) { api.logout(refresh).catch(() => {}); }
    clearAuthTokens();
    setAccessToken(null);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ isAuthenticated, accessToken, user, login, logout, loading }), [isAuthenticated, accessToken, user, login, logout, loading]);

  useEffect(() => {
    if (accessToken) {
      api.me().then(setUser).catch(() => {});
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


