<template>
  <v-container max-width="900">
    <div>
      <div class="ml-4 mb-3">
        <h1 class="text-h4 font-weight-bold">Проекты</h1>
      </div>
      <v-container>
        <v-row v-for="i in projects">
          <v-col>
            <project-card :project="i"></project-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import type { ProjectRead } from "@/api-client/types";
import type { Project } from "@/types/project"; // если есть отдельный файл с твоим Project
import { getSubjectArea } from "@/api-client/subjectAreas";

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

import { ref, onMounted } from "vue";
import { getProjects } from "@/api-client/projects";
import { getTeamMembers } from "@/api-client/teamMembers";
const projects = ref<Project[]>([]);

onMounted(async () => {
  try {
    const apiProjects = await getProjects();
    projects.value = await Promise.all(
      apiProjects.map(mapProjectReadToProject)
    );
  } catch (e) {
    console.error("Ошибка загрузки проектов", e);
  }
});
</script>
