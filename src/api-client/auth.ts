import api from './http';
import type { LoginRequest, LoginResponse, UserCreate, UserRead } from './types';

// Логин (получить токен)
export async function login(data: LoginRequest): Promise<LoginResponse> {
  const params = new URLSearchParams();
  params.append('username', data.username);
  params.append('password', data.password);

  const response = await api.post('/auth/auth/token', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  // Сохраняем токен в localStorage
  return response.data;
}

// Регистрация пользователя
export async function register(data: UserCreate): Promise<UserRead> {
  const response = await api.post('/auth/auth/register', data);
  return response.data;
}

// Получить текущего пользователя (по токену)
export async function getMe(): Promise<UserRead> {
  const response = await api.get('/auth/auth/users/me');
  return response.data;
}