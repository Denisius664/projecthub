import api from './http';
import type { ProjectCreate, ProjectRead } from './types';

// Получить список проектов (основной эндпоинт)
export async function getProjects(skip = 0, limit = 100): Promise<ProjectRead[]> {
  const response = await api.get('/api/projects/', { params: { skip, limit } });
  return response.data;
}

// Получить проект по id
export async function getProject(project_id: number): Promise<ProjectRead> {
  const response = await api.get(`/api/projects/${project_id}`);
  return response.data;
}

// Создать новый проект (нужен токен)
export async function createProject(data: ProjectCreate): Promise<ProjectRead> {
  const response = await api.post('/api/projects/', data);
  return response.data;
}

// Обновить существующий проект
export async function updateProject(project_id: number, data: ProjectCreate): Promise<ProjectRead> {
  const response = await api.put(`/api/projects/${project_id}`, data);
  return response.data;
}

// Удалить проект
export async function deleteProject(project_id: number): Promise<void> {
  await api.delete(`/api/projects/${project_id}`);
}

// Поиск проектов по ключевому слову
export async function searchProjectsByKeyword(keyword: string): Promise<ProjectRead[]> {
  const response = await api.get('/api/projects/search_by_keyword', { params: { keyword } });
  return response.data;
}

// Фильтрованный поиск проектов (по нескольким параметрам)
export async function filterProjects(params: {
  search?: string;
  status?: string;
  subject_area_id?: number;
  is_public?: boolean;
  skip?: number;
  limit?: number;
}): Promise<ProjectRead[]> {
  const response = await api.get('/api/projects_fil/', { params });
  return response.data;
}