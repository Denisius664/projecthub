import api from './http';
import type { ProjectConnectionCreate, ProjectConnectionRead } from './types';

// Получить все связи проекта (по project_id)
export async function getProjectConnections(project_id: number): Promise<ProjectConnectionRead[]> {
  const response = await api.get(`/api/project_connections/${project_id}`);
  return response.data;
}

// Добавить новую связь между проектами
export async function createProjectConnection(data: ProjectConnectionCreate): Promise<ProjectConnectionRead> {
  const response = await api.post('/api/project_connections/', data);
  return response.data;
}

// Удалить связь между проектами
export async function deleteProjectConnection(project_id: number, related_project_id: number): Promise<void> {
  await api.delete(`/api/project_connections/${project_id}/${related_project_id}`);
}