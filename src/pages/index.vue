<template>
  <v-container class="py-6" max-width="1000px">
    <!-- Поиск -->
    <div class="d-flex ga-4 mb-4">
      <v-text-field
        v-model="searchQuery"
        placeholder="Поиск проектов"
        variant="outlined"
        clearable
        density="compact"
        prepend-inner-icon="mdi-magnify"
        @input="doSearch"
      />
      <v-btn
        color="primary"
        prepend-icon="mdi-filter"
        variant="outlined"
        @click="filtersDialog = true"
      >
        Фильтры
      </v-btn>
    </div>

    <!-- Список проектов -->
    <v-row v-if="projects.length">
      <v-col
        v-for="project in projects"
        :key="project.id"
        cols="12"
        md="12"
      >
        <project-card :project="project"></project-card>
      </v-col>
    </v-row>
    <p v-else class="text-medium-emphasis">Проекты не найдены</p>

    <!-- Диалог фильтров -->
    <v-dialog v-model="filtersDialog" max-width="500">
      <v-card>
        <v-card-title>Фильтры</v-card-title>
        <v-card-text>
          <v-select
            v-model="filters.status"
            :items="['в работе', 'приостановлен', 'завершен']"
            label="Статус"
            clearable
          />
          <v-text-field
            v-model.number="filters.subject_area_id"
            label="ID предметной области"
            clearable
          />
          <v-switch
            v-model="filters.is_public"
            label="Только публичные"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="filtersDialog = false">Отмена</v-btn>
          <v-btn color="primary" @click="applyFilters">Применить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { filterProjects } from '@/api-client/projects'
import type { ProjectRead } from '@/api-client/types'
import { getSubjectArea } from '@/api-client/subjectAreas'
import { getTeamMembers } from '@/api-client/teamMembers'
import { Project } from '@/types'

const router = useRouter()

// состояние
const searchQuery = ref('')
const projects = ref<Project[]>([])

// фильтры
const filtersDialog = ref(false)
const filters = ref<{
  status?: string
  subject_area_id?: number
  is_public?: boolean
}>({})

// загрузка проектов
async function doSearch() {
  const apiProjects = await filterProjects({
    search: searchQuery.value,
    ...filters.value,
    limit: 20,
  })
  projects.value = await Promise.all(
      apiProjects.map(mapProjectReadToProject)
    );
}

// применить фильтры
async function applyFilters() {
  filtersDialog.value = false
  await doSearch()
}

// переход в проект
function goToProject(projectId: number) {
  router.push(`/project/${projectId}`)
}

onMounted(() => {
  doSearch()
})

async function mapProjectReadToProject(api: ProjectRead): Promise<Project> {
  let knowledgeArea: string[] = [];
  let participants: number = 0;
  try {
    if (api.subject_area_id) {
      var sa = await getSubjectArea(api.subject_area_id);
      // Можно вложенность, если API возвращает parent/children
      knowledgeArea = [sa.name];
      while (sa.parent_id != null) {
        var sa = await getSubjectArea(sa.parent_id);
        knowledgeArea.unshift(sa.name)
      }
    }
  } catch (e) {
    // Если не удалось — knowledgeArea останется пустым
    console.error("Ошибка получения области знаний:", e);
  }

  try {
    const members = await getTeamMembers(api.id);
    participants = members.length;
  } catch (e) {
    console.error("Ошибка получения участников:", e);
  }

  return {
    id: String(api.id),
    title: api.title,
    status: api.status,
    createdAt: api.created_at,
    description: api.description || "",
    tags: api.keywords || [],
    knowledgeArea,
    participants,
    citationIndex: api.citation_count ?? 0,
    linkedProjects: [], // если нужно — реализуй аналогично
  };
}
</script>
