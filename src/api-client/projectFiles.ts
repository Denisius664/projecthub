import api from './http';
import type { ProjectFileCreate, ProjectFileRead } from './types';

// Получить все файлы проекта (можно фильтровать по project_id)
export async function getProjectFiles(project_id?: number): Promise<ProjectFileRead[]> {
  const response = await api.get('/api/project_files/', {
    params: project_id ? { project_id } : {},
  });
  return response.data;
}

// Получить файл по id
export async function getProjectFile(file_id: number): Promise<ProjectFileRead> {
  const response = await api.get(`/api/project_files/${file_id}`);
  return response.data;
}

// Создать запись о файле (метаданные)
export async function createProjectFile(data: ProjectFileCreate): Promise<ProjectFileRead> {
  const response = await api.post('/api/project_files/', data);
  return response.data;
}

// Загрузить файл (multipart/form-data)
export async function uploadProjectFile(
  file: File,
  project_id: number,
  uploaded_by: number,
  is_public?: boolean,
): Promise<ProjectFileRead> {
  const form = new FormData();
  form.append('file', file);

  const params: Record<string, any> = { project_id, uploaded_by };
  if (is_public !== undefined) params.is_public = is_public;

  const response = await api.post('/api/project_files/upload', form, { params });
  return response.data;
}

// Обновить файл (заменить содержимое)
export async function updateProjectFile(
  file_id: number,
  file: File,
  is_public?: boolean,
): Promise<ProjectFileRead> {
  const form = new FormData();
  form.append('file', file);

  const params: Record<string, any> = {};
  if (is_public !== undefined) params.is_public = is_public;

  const response = await api.put(`/api/project_files/${file_id}`, form, { params });
  return response.data;
}

// Удалить файл
export async function deleteProjectFile(file_id: number): Promise<void> {
  await api.delete(`/api/project_files/${file_id}`);
}

// Скачать файл по id (вернет blob, если это не JSON!)
export async function downloadProjectFileById(file_id: number): Promise<Blob> {
  const response = await api.get(`/api/project_files/download_by_id/${file_id}`, {
    responseType: 'blob',
  });
  return response.data;
}