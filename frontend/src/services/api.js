const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000/api/v1';

export function getApiBase() {
  return API_BASE.replace(/\/$/, '');
}

export function getAuthToken() {
  return localStorage.getItem('access_token');
}

export function setAuthTokens({ access, refresh }) {
  if (access) localStorage.setItem('access_token', access);
  if (refresh) localStorage.setItem('refresh_token', refresh);
}

export function clearAuthTokens() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

async function request(path, { method = 'GET', body, headers = {}, auth = true } = {}) {
  const token = getAuthToken();
  const finalHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };
  if (auth && token) {
    finalHeaders['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${getApiBase()}${path}`, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let errText = 'Request failed';
    try {
      const data = await res.json();
      errText = data.detail || JSON.stringify(data);
    } catch {}
    throw new Error(errText);
  }
  const contentType = res.headers.get('content-type') || '';
  return contentType.includes('application/json') ? res.json() : res.text();
}

export const api = {
  health: () => request('/health/', { auth: false }),
  register: (payload) => request('/auth/register/', { method: 'POST', body: payload, auth: false }),
  login: (payload) => request('/auth/token/', { method: 'POST', body: payload, auth: false }),
  refresh: (payload) => request('/auth/token/refresh/', { method: 'POST', body: payload, auth: false }),
  me: () => request('/auth/me/', { method: 'GET' }),
  logout: (refresh) => request('/auth/logout/', { method: 'POST', body: { refresh } }),
};


