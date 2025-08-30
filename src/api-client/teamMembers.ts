import api from './http';
import type { TeamMemberCreate, TeamMemberRead } from './types';

// Получить всех участников команды (можно фильтровать по project_id)
export async function getTeamMembers(project_id?: number): Promise<TeamMemberRead[]> {
  const response = await api.get('/api/team_members/', {
    params: project_id ? { project_id } : {},
  });
  return response.data;
}

// Получить участника по id
export async function getTeamMember(team_member_id: number): Promise<TeamMemberRead> {
  const response = await api.get(`/api/team_members/${team_member_id}`);
  return response.data;
}

// Добавить нового участника
export async function createTeamMember(data: TeamMemberCreate): Promise<TeamMemberRead> {
  const response = await api.post('/api/team_members/', data);
  return response.data;
}

// Обновить участника
export async function updateTeamMember(team_member_id: number, data: TeamMemberCreate): Promise<TeamMemberRead> {
  const response = await api.put(`/api/team_members/${team_member_id}`, data);
  return response.data;
}

// Удалить участника
export async function deleteTeamMember(team_member_id: number): Promise<void> {
  await api.delete(`/api/team_members/${team_member_id}`);
}