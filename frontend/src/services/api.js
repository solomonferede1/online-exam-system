/**
 * API client utilities for communicating with the Django backend.
 *
 * Exposes helpers for authentication token storage and typed requests to
 * versioned endpoints. By default includes Authorization header when a token
 * exists. Consumers should use `api.login`, `api.register`, `api.me`, etc.
 *
 * @module services/api
 */
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
  getUsers: () => request('/users/', { method: 'GET' }),
  createUser: (payload) => request('/users/', { method: 'POST', body: payload }),
  updateUser: (id, payload) => request(`/users/${id}/`, { method: 'PUT', body: payload }),
  deleteUser: (id) => request(`/users/${id}/`, { method: 'DELETE' }),
  getExams: () => request('/exams/', { method: 'GET' }),
  getExam: (id) => request(`/exams/${id}/`, { method: 'GET' }),
  createExam: (payload) => request('/exams/', { method: 'POST', body: payload }),
  updateExam: (id, payload) => request(`/exams/${id}/`, { method: 'PUT', body: payload }),
  deleteExam: (id) => request(`/exams/${id}/`, { method: 'DELETE' }),
  createQuestion: (examId, payload) => request(`/exams/${examId}/questions/`, { method: 'POST', body: payload }),
  updateQuestion: (id, payload) => request(`/questions/${id}/`, { method: 'PUT', body: payload }),
  deleteQuestion: (id) => request(`/questions/${id}/`, { method: 'DELETE' }),
  createChoice: (questionId, payload) => request(`/questions/${questionId}/choices/`, { method: 'POST', body: payload }),
  updateChoice: (id, payload) => request(`/choices/${id}/`, { method: 'PUT', body: payload }),
  deleteChoice: (id) => request(`/choices/${id}/`, { method: 'DELETE' }),
};


