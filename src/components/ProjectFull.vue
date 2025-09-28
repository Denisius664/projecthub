<template>
  <v-container class="pt-10 d-flex flex-column ga-4" max-width="900px">
    <v-breadcrumbs class="text-subtitle-2 py-0 text-disabled pt-1" density="compact" :items="project.knowledgeArea">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <div class="d-flex justify-space-between">
      <div class="d-flex ga-5">
        <span class="text-h3 text-medium-emphasis">#{{ project.id }}</span>
        <h1 class="text-h3">{{ project.title }}</h1>
      </div>
      <v-btn v-if="canSeeSettings" color="primary" icon="mdi-cog" :to="`/project/${project.id}/settings`" />
    </div>

    <div>
      <v-chip v-for="tag in project.tags" :key="tag" class="mr-1" color="primary" variant="tonal">
        {{ tag }}
      </v-chip>
    </div>
    <div>
      <p class="text-medium-emphasis">Создано: {{ formatDate(project.createdAt) }}</p>
    </div>

    <v-card v-if="project.description" :text="project.description" title="Описание проекта" />
    <v-card v-else text="Нет описания проекта" title="Описание проекта"></v-card>
    <!-- <v-card text="Контент README файла в формате md" title="README" /> -->

    <v-card title="Файлы проекта">
      <v-card-text>
        <!-- Загрузка файлов -->
        <v-file-input v-model="newFiles" multiple show-size prepend-icon="mdi-upload" label="Загрузить файлы" />
        <v-btn class="mt-2" color="primary" @click="uploadFiles" :disabled="!newFiles || newFiles.length === 0">
          Загрузить
        </v-btn>

        <!-- Список файлов -->
        <v-table class="mt-4">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Дата загрузки</th>
              <th>Доступ</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="file in projectFiles" :key="file.id">
              <td>{{ file.name }}</td>
              <td>{{ new Date(file.uploaded_at).toLocaleString() }}</td>
              <td>
                <v-chip size="small" :color="file.is_public ? 'green' : 'grey'">
                  {{ file.is_public ? "Публичный" : "Приватный" }}
                </v-chip>
              </td>
              <td>
                <v-btn icon="mdi-download" variant="text" @click="downloadFile(file.id, file.name)" />
                <v-btn icon="mdi-delete" color="error" variant="text" @click="deleteFile(file.id)" />
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
    <!-- Участники проекта -->
    <v-card title="Участники">
      <v-list>
        <v-list-item v-for="member in members" :title="getUserName(member.user_id)" :key="member.user_id">
          <template v-slot:prepend>
            <v-avatar color="grey-lighten-1">
              <v-icon color="white">mdi-account</v-icon>
            </v-avatar>
          </template>
          <template v-slot:append>
            <v-select v-model="member.role" :items="['участник', 'куратор', 'ответственный']"
              @update:model-value="(newRole) => changeRole(member.id, newRole)" />
            <v-btn v-if="canRemove(member.user_id)" icon="mdi-delete" color="error" variant="text"
              @click="removeMember(member.id)" />
          </template>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="inviteDialog = true">Пригласить</v-btn>
      </v-card-actions>
    </v-card>

    <v-card title="Связанные проекты">
      <v-list>
        <v-list-item v-for="rel in projectConnections" :key="rel.related_project_id" link
          @click="openProject(rel.related_project_id)">
          <v-list-item-title>
            {{ getProjectTitle(rel.related_project_id) }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Добавлен {{ new Date(rel.created_at).toLocaleDateString() }}
          </v-list-item-subtitle>
          <template v-slot:append>
            <v-btn icon="mdi-delete" color="error" variant="text" @click.stop="
              removeConnection(rel.project_id, rel.related_project_id)
              " />
          </template>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="connectionDialog = true">
          Добавить связь
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Диалог добавления связи -->
    <v-dialog v-model="connectionDialog" max-width="600px">
      <v-card>
        <v-card-title>Добавить связанный проект</v-card-title>
        <v-card-text>
          <v-autocomplete v-model="selectedProject" item-title="title" item-value="id" :items="allProjects"
            label="Выберите проект" variant="outlined" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="connectionDialog = false">Отмена</v-btn>
          <v-btn color="primary" @click="addConnection">Добавить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Диалог приглашения -->
    <v-dialog v-model="inviteDialog" max-width="600px">
      <v-card>
        <v-card-title>Пригласить участников</v-card-title>
        <v-card-text>
          <v-autocomplete v-model="selectedUsers" chips item-title="name" item-value="id" :items="allUsers"
            label="Выберите пользователей" multiple variant="outlined" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="inviteDialog = false">Отмена</v-btn>
          <v-btn color="primary" @click="inviteUsers">Пригласить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import {
  getProjectConnections,
  createProjectConnection,
  deleteProjectConnection,
} from "@/api-client/projectConnections";
import {
  getProjectFiles,
  uploadProjectFile,
  deleteProjectFile,
  downloadProjectFileById,
} from "@/api-client/projectFiles";
import { getProjects } from "@/api-client/projects";
import {
  createTeamMember,
  deleteTeamMember,
  getTeamMembers,
  updateTeamMember,
} from "@/api-client/teamMembers";
import type {
  TeamMemberCreate,
  TeamMemberRead,
  UserRead,
  ProjectConnectionRead,
  ProjectConnectionCreate,
  ProjectRead,
  ProjectFileRead,
} from "@/api-client/types";
import { getUsers } from "@/api-client/users";
import type { ProjectFull } from "@/types";
import { formatDate } from "@/utils/dateformat";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const { user, isAdmin } = storeToRefs(authStore); // user.id, isAdmin: boolean

const members = ref<TeamMemberRead[]>([]);
const allUsers = ref<UserRead[]>([]);
const selectedUsers = ref<number[]>([]);
const inviteDialog = ref(false);

const projectConnections = ref<ProjectConnectionRead[]>([]);
const allProjects = ref<ProjectRead[]>([]);

const connectionDialog = ref(false);
const selectedProject = ref<number | null>(null);
const router = useRouter();

const projectFiles = ref<ProjectFileRead[]>([]);
const newFiles = ref<File[]>([]);

// роль текущего пользователя в проекте
const currentMember = computed(() =>
  members.value.find((m) => m.user_id === user.value?.id) || null
);
const currentRole = computed(() => currentMember.value?.role || null);

const canSeeSettings = computed(() => {
  return isAdmin.value || currentRole.value !== null;
});

function canRemove(userId: number): boolean {
  if (isAdmin.value) return true;
  if (!currentRole.value) return false;
  if (currentRole.value === "участник") return userId === user.value?.id;
  return true; // куратор или ответственный
}

const props = defineProps<{
  project: ProjectFull;
}>();

onMounted(async () => {
  members.value = await getTeamMembers(Number(props.project.id));
  allUsers.value = await getUsers();
  projectConnections.value = await getProjectConnections(
    Number(props.project.id)
  );
  allProjects.value = await getProjects();
  projectFiles.value = await getProjectFiles(Number(props.project.id));
});

async function inviteUsers() {
  if (selectedUsers.value.length > 0) {
    for (const user of selectedUsers.value) {
      const member: TeamMemberCreate = {
        project_id: Number(props.project.id),
        user_id: user,
        role: "участник",
      };
      await createTeamMember(member);
    }
    // // обновляем список участников
    members.value = await getTeamMembers(Number(props.project.id));
    selectedUsers.value = [];
    inviteDialog.value = false;
  }
}

// утилита для получения имени по id
function getUserName(userId: number): string {
  const user = allUsers.value.find((u) => u.id === userId);
  return user ? user.name : `ID ${userId}`;
}

// смена роли
async function changeRole(
  member_id: number,
  newRole: "участник" | "куратор" | "ответственный"
) {
  const user_id = members.value.find((m) => m.id == member_id)?.id;
  if (user_id) {
    const data: TeamMemberCreate = {
      project_id: Number(props.project.id),
      user_id,
      role: newRole,
    };
    await updateTeamMember(member_id, data);
  } else {
    alert("Пользователь не найден!");
  }
}

function getProjectTitle(projectId: number): string {
  const project = allProjects.value.find((p) => p.id === projectId);
  return project ? project.title : `Проект #${projectId}`;
}

async function addConnection() {
  if (!selectedProject.value) return;

  const connection: ProjectConnectionCreate = {
    project_id: Number(props.project.id),
    related_project_id: selectedProject.value,
  };

  await createProjectConnection(connection);
  projectConnections.value = await getProjectConnections(
    Number(props.project.id)
  );

  selectedProject.value = null;
  connectionDialog.value = false;
}

async function removeConnection(
  project_id: number,
  related_project_id: number
) {
  await deleteProjectConnection(project_id, related_project_id);
  projectConnections.value = await getProjectConnections(
    Number(props.project.id)
  );
}

function openProject(projectId: number) {
  router.push(`/project/${projectId}`).then(() => {
    // форсим обновление страницы
    window.location.reload();
  });
}

async function uploadFiles() {
  if (!newFiles.value || newFiles.value.length === 0) return;

  for (const file of newFiles.value) {
    await uploadProjectFile(
      file,
      Number(props.project.id),
      1, // TODO: заменить на текущего пользователя
      true
    );
  }
  projectFiles.value = await getProjectFiles(Number(props.project.id));
  newFiles.value = [];
}

async function deleteFile(fileId: number) {
  await deleteProjectFile(fileId);
  projectFiles.value = await getProjectFiles(Number(props.project.id));
}

async function downloadFile(fileId: number, filename: string) {
  const blob = await downloadProjectFileById(fileId);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

async function removeMember(memberId: number) {
  await deleteTeamMember(memberId)
  members.value = await getTeamMembers(Number(props.project.id));
}
</script>
