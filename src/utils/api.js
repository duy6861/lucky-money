// client/src/utils/api.js
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL
// API cho người dùng
export const drawApi = {
  draw: (name) => axios.post(`${API_BASE}/draw`, { name }),
};

// API cho admin
const getAuthHeader = () => {
  const token = localStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const adminApi = {
  login: (username, password) =>
    axios.post(`${API_BASE}/auth/login`, { username, password }),

  getSummary: () =>
    axios.get(`${API_BASE}/admin/summary`, { headers: getAuthHeader() }),

  getAllDraws: () =>
    axios.get(`${API_BASE}/admin/draws`, { headers: getAuthHeader() }),
};