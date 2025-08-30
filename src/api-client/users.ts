import api from './http';
import type { UserCreate, UserRead } from './types';

// Получить список пользователей (с пагинацией)
export async function getUsers(skip = 0, limit = 100): Promise<UserRead[]> {
  const response = await api.get('/api/users/', { params: { skip, limit } });
  return response.data;
}

// Получить пользователя по id
export async function getUser(user_id: number): Promise<UserRead> {
  const response = await api.get(`/api/users/${user_id}`);
  return response.data;
}

// Создать пользователя (админ)
export async function createUser(data: UserCreate): Promise<UserRead> {
  const response = await api.post('/api/users/', data);
  return response.data;
}

// Удалить пользователя (админ)
export async function deleteUser(user_id: number): Promise<void> {
  await api.delete(`/api/users/${user_id}`);
}