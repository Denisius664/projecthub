import api from './http';
import type { SubjectAreaCreate, SubjectAreaRead } from './types';

// Получить список предметных областей
export async function getSubjectAreas(skip = 0, limit = 100): Promise<SubjectAreaRead[]> {
  const response = await api.get('/api/subject_areas/', { params: { skip, limit } });
  return response.data;
}

// Получить одну предметную область
export async function getSubjectArea(subject_area_id: number): Promise<SubjectAreaRead> {
  const response = await api.get(`/api/subject_areas/${subject_area_id}`);
  return response.data;
}

// Создать новую область
export async function createSubjectArea(data: SubjectAreaCreate): Promise<SubjectAreaRead> {
  const response = await api.post('/api/subject_areas/', data);
  return response.data;
}

// Обновить область
export async function updateSubjectArea(subject_area_id: number, data: SubjectAreaCreate): Promise<SubjectAreaRead> {
  const response = await api.put(`/api/subject_areas/${subject_area_id}`, data);
  return response.data;
}

// Удалить область
export async function deleteSubjectArea(subject_area_id: number): Promise<void> {
  await api.delete(`/api/subject_areas/${subject_area_id}`);
}