import axios from 'axios';

const API_URL = 'http://sneid.ru:8000';

const api = axios.create({
  baseURL: API_URL,
});

// Добавляем токен из localStorage в Authorization
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;