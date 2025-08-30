// Типы для всех сущностей по openapi.json

export interface UserCreate {
    name: string;
    email: string;
    role: 'пользователь' | 'админ';
    password: string;
  }
  
  export interface UserRead {
    name: string;
    email: string;
    role: 'пользователь' | 'админ';
    id: number;
    created_at: string;
  }
  
  export interface ProjectCreate {
    title: string;
    description: string | null;
    status: 'в работе' | 'приостановлен' | 'завершен';
    keywords: string[];
    subject_area_id: number | null;
    is_public?: boolean | null;
  }
  
  export interface ProjectRead {
    title: string;
    description: string | null;
    status: 'в работе' | 'приостановлен' | 'завершен';
    keywords: string[];
    subject_area_id: number | null;
    is_public?: boolean | null;
    id: number;
    citation_count: number | null;
    created_at: string;
  }
  
  export interface SubjectAreaCreate {
    name: string;
    description: string | null;
    user_id: number;
    parent_id: number | null;
  }
  
  export interface SubjectAreaRead {
    name: string;
    description: string | null;
    user_id: number;
    parent_id: number | null;
    id: number;
    created_at: string;
    path: string | null;
  }
  
  export interface TeamMemberCreate {
    project_id: number;
    user_id: number;
    role: 'участник' | 'куратор' | 'ответственный';
  }
  
  export interface TeamMemberRead {
    project_id: number;
    user_id: number;
    role: 'участник' | 'куратор' | 'ответственный';
    id: number;
    joined_at: string;
  }
  
  export interface ProjectFileCreate {
    project_id: number;
    name: string;
    url: string;
    file_metadata?: Record<string, any> | null;
    uploaded_by: number;
    is_public?: boolean | null;
  }
  
  export interface ProjectFileRead {
    project_id: number;
    name: string;
    url: string;
    file_metadata?: Record<string, any> | null;
    uploaded_by: number;
    is_public?: boolean | null;
    id: number;
    uploaded_at: string;
  }
  
  export interface ProjectConnectionCreate {
    project_id: number;
    related_project_id: number;
  }
  
  export interface ProjectConnectionRead {
    project_id: number;
    related_project_id: number;
    created_at: string;
  }
  
  // Типы для авторизации
  export interface LoginRequest {
    username: string;
    password: string;
  }
  
  export interface LoginResponse {
    access_token: string;
    token_type: string;
  }