<template>
  <v-container class="py-6" max-width="1000px">
    <!-- Поиск -->
    <div class="d-flex ga-4 mb-4">
      <v-text-field v-model="searchQuery" placeholder="Поиск проектов" variant="outlined" clearable density="compact"
        prepend-inner-icon="mdi-magnify" @input="doSearch" />
      <v-btn color="primary" prepend-icon="mdi-filter" variant="outlined" @click="filtersDialog = true">
        Фильтры
      </v-btn>
    </div>

    <v-row v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary" />
      </v-col>
    </v-row>

    <!-- Список проектов -->
    <v-row v-else-if="projects.length">
      <v-col v-for="project in projects" :key="project.id" cols="12" md="12">
        <project-card :project="project"></project-card>
      </v-col>
    </v-row>
    <p v-else class="text-medium-emphasis">Проекты не найдены</p>
    <!-- Диалог фильтров -->
    <v-dialog v-model="filtersDialog" max-width="500">
      <v-card>
        <v-card-title>Фильтры</v-card-title>
        <v-card-text>
          <v-select v-model="filters.status" :items="['в работе', 'приостановлен', 'завершен']" label="Статус"
            clearable />
          <v-select :items="subjectAreas" item-value="id" item-title="name" clearable v-model="filters.subject_area_id"
            label="Предметная область" />
          <v-switch v-model="filters.is_public" label="Только публичные" />
          <v-combobox v-model="filters.tags" label="Теги" multiple chips clearable hide-selected
            placeholder="Введите теги" />
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
import { ref, onMounted, computed } from 'vue'
import { filterProjectsV2 } from '@/api-client/projects'
import type { ProjectRead, SubjectAreaRead } from '@/api-client/types'
import { getSubjectArea, getSubjectAreas } from '@/api-client/subjectAreas'
import { getTeamMembers } from '@/api-client/teamMembers'
import type { Project } from '@/types'
import { getProjectConnections } from '@/api-client/projectConnections'

const loading = ref(false)
// состояние
const searchQuery = ref('')
const projects = ref<Project[]>([])

const subjectAreas = ref<SubjectAreaRead[]>([])

// фильтры
const filtersDialog = ref(false)
const filters = ref({
  status: null as string | null,
  subject_area_id: null as number | null,
  is_public: false,
  tags: [] as string[],
})


const tagsAsString = computed(() => filters.value.tags.join(', '))

// загрузка проектов
async function doSearch() {
  loading.value = true
  const params = {
    status: filters.value.status || undefined,
    subject_area_id: filters.value.subject_area_id || undefined,
    is_public: filters.value.is_public || undefined,
    keywords: tagsAsString.value || undefined,
    keyword_match: 'all' as const,
    limit: 20,
  }

  try {
    let apiProjects = await filterProjectsV2(params)
    projects.value = await Promise.all(
      apiProjects.map(mapProjectReadToProject)
    );
  } catch (e) {
    console.error('Ошибка загрузки проектов:', e)
  } finally {
    loading.value = false
  }
}

// применить фильтры
async function applyFilters() {
  filtersDialog.value = false
  await doSearch()
}

onMounted(async () => {
  doSearch()
  subjectAreas.value = await getSubjectAreas()
})

async function mapProjectReadToProject(api: ProjectRead): Promise<Project> {
  let knowledgeArea: string[] = [];
  let participants: number = 0;
  let linkedProjects: { id: string }[] = [];
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

  try {
    var pc = await getProjectConnections(api.id);
    linkedProjects = pc.map((v) => {
      return { id: `${v.related_project_id}` };
    })
  } catch (e) {
    // Если не удалось — knowledgeArea останется пустым
    console.error("Ошибка получения области знаний:", e);
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
    linkedProjects, // если нужно — реализуй аналогично
  };
}
</script>
