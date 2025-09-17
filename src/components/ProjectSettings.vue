<template>
    <v-container class="pt-10 d-flex flex-column ga-4" max-width="900px">
        <v-row>
            <v-col>
                <v-btn color="grey" density="compact" prepend-icon="mdi-arrow-left" :to="`/project/${initialSettings.id}`">
                    Назад к проекту
                </v-btn>
            </v-col>
        </v-row>

        <div class="d-flex flex-row ga-5">
            <span class="text-h3 text-medium-emphasis">Настройки проекта:</span>
            <h1 class="text-h3">{{ edited.title }}</h1>
        </div>

        <div>
            <p class="text-medium-emphasis">Создано: {{ edited.createdAt }}</p>
        </div>

        <v-sheet class="pb-4" rounded :elevation="2">
            <v-container>
                <v-row no-gutters>
                    <p class="text-h4">Основная информация</p>
                </v-row>

                <v-row no-gutters>
                    <v-col>
                        <p class="text-subtitle-1">Название проекта</p>
                        <v-text-field v-model="edited.title" variant="outlined" />
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col>
                        <p class="text-subtitle-1">Описание проекта</p>
                        <v-textarea v-model="edited.description" variant="outlined" />
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col>
                        <p class="text-subtitle-1">Статус</p>
                        <v-select v-model="edited.status" :items="['в работе', 'приостановлен', 'завершен']" variant="outlined" />
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col>
                        <p class="text-subtitle-1">Тэги</p>
                        <v-combobox v-model="edited.tags" multiple chips variant="outlined" label="Введите тэги" />
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col>
                        <p class="text-subtitle-1">Дата создания</p>
                        <v-text-field v-model="edited.createdAt" variant="outlined" disabled />
                    </v-col>
                </v-row>

                <v-row justify="end" class="mt-4 pr-5">
                    <v-btn variant="text" color="grey" class="mr-3">Отмена</v-btn>
                    <v-btn color="primary" @click="saveSettings">Сохранить</v-btn>
                </v-row>
            </v-container>
        </v-sheet>
    </v-container>
</template>
  
<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { ProjectSettings } from '@/types'
import { updateProject } from '@/api-client/projects';
import type { ProjectCreate } from '@/api-client/types';

// Локальный reactive объект для редактирования — создаём копию
const props = defineProps<{ initialSettings: ProjectSettings }>()

const edited = ref<ProjectSettings>({ ...props.initialSettings })

// Обновлять edited при изменении пропса initialSettings
watch(
    () => props.initialSettings,
    (newVal) => {
        edited.value = { ...newVal }
    },
    { deep: true }
)

function saveSettings() {
    var p: ProjectCreate = {
        title: edited.value.title,
        description: edited.value.description,
        status: edited.value.status as any,
        keywords: edited.value.tags,
        subject_area_id: null,
        is_public: null,
    }
    updateProject(Number(props.initialSettings.id), p)
}
</script>
  
<style scoped></style>
  