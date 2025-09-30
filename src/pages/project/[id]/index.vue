<template>
  <v-progress-circular v-if="loading" indeterminate color="primary" class="ma-6" />
  <project-full v-else-if="project" :project="project" />
  <div v-else>Проект не найден</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ProjectRead } from '@/api-client/types'
import { getProject } from '@/api-client/projects'
import { getSubjectArea } from '@/api-client/subjectAreas'
import { useRoute } from 'vue-router'

export interface ProjectFull {
  id: string
  title: string
  status: string
  createdAt: string
  description: string
  tags: string[]
  knowledgeArea: string[]
  participants: number
  citationIndex: number
  linkedProjects: { id: string }[]
}

const loading = ref(false)

async function mapProjectReadToProjectFull(api: ProjectRead): Promise<ProjectFull> {
  let knowledgeArea: string[] = []
  try {
    if (api.subject_area_id) {
      const sa = await getSubjectArea(api.subject_area_id)
      knowledgeArea = [sa.name]
    }
  } catch (e) {
    // Оставляем пустым
  }

  // linkedProjects и participants — добавь маппинг, если появятся в API
  return {
    id: String(api.id),
    title: api.title,
    status: api.status,
    createdAt: api.created_at,
    description: api.description ?? '',
    tags: api.keywords ?? [],
    knowledgeArea,
    participants: 0, // если появится поле — подставь
    citationIndex: api.citation_count ?? 0,
    linkedProjects: [], // если есть в api — добавь
  }
}

const project = ref<ProjectFull | null>(null)
const route = useRoute()
const projectId: number = 'id' in route.params ? Number(route.params.id) : 0

onMounted(async () => {
  loading.value = true
  try {
    const apiProject = await getProject(projectId)
    project.value = await mapProjectReadToProjectFull(apiProject)
  } catch (e) {
    console.error('Ошибка загрузки проекта', e)
  } finally {
    loading.value = false
  }
})
</script>