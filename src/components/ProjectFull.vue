<template>
    <v-container class="pt-10 d-flex flex-column ga-4" max-width="900px">
      <v-breadcrumbs
        class="text-subtitle-2 py-0 text-disabled pt-1"
        density="compact"
        :items="project.knowledgeArea"
      >
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
  
      <div class="d-flex justify-space-between">
        <div class="d-flex ga-5">
          <span class="text-h3 text-medium-emphasis">#{{ project.id }}</span>
          <h1 class="text-h3">{{ project.title }}</h1>
        </div>
        <v-btn :to="`/project/${project.id}/settings`" color="primary" icon="mdi-cog"></v-btn>
      </div>
  
      <div>
        <p class="text-medium-emphasis">Создано: {{ project.createdAt }}</p>
      </div>
  
      <v-card title="Описание проекта" :text="project.description" />
  
      <v-card title="Тэги">
        <v-card-item>
          <v-chip
            v-for="tag in project.tags"
            :key="tag"
            color="primary"
            class="mr-1"
            variant="tonal"
          >
            {{ tag }}
          </v-chip>
        </v-card-item>
      </v-card>
  
      <v-file-upload multiple clearable density="comfortable" variant="comfortable" />
  
      <v-card title="README" text="Контент README файла в формате md" />
  
      <v-card title="Файлы проекта" text="Файлы проекта" />
    </v-container>
  </template>
  
  <script setup lang="ts">
  import type { ProjectFull } from '@/types'

  
  const props = defineProps<{
    project: ProjectFull
  }>()
  </script>
  