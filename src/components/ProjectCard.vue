<template>
    <v-card variant="elevated" elevation="4">
        <v-card-item>
            <v-breadcrumbs class="text-subtitle-2 py-0 text-disabled pt-1" density="compact"
                :items="project.knowledgeArea">
                <template #divider>
                    <v-icon icon="mdi-chevron-right" />
                </template>
            </v-breadcrumbs>

            <v-card-title>
                <v-list-item :to="`/project/${project.id}`" class="pa-0 truncate">
                    <!-- <span class="text-medium-emphasis">#{{ project.id }}</span> -->
                    {{ project.title }}
                    <v-chip :color="statusColor" class="font-weight-medium" variant="tonal">
                        {{ project.status }}
                    </v-chip>
                </v-list-item>
            </v-card-title>

            <v-card-subtitle>Создан: {{ formatDate(project.createdAt) }}</v-card-subtitle>

            <!-- <template #append>
                <v-btn variant="text" icon="mdi-star"></v-btn>
            </template> -->
        </v-card-item>

        <v-card-text class="truncate pb-0">
            {{ project.description }}
        </v-card-text>

        <v-card-item density="compact" class="pb-0 mb-n4">
            <template #prepend>
                <v-chip v-for="tag in project.tags" :key="tag" color="primary" class="mr-1" variant="tonal">
                    {{ tag }}
                </v-chip>
            </template>
            <template #append>
                <v-card-text class="text-medium-emphasis">
                    Индекс цитирования: {{ project.citationIndex }}
                </v-card-text>
            </template>
        </v-card-item>

        <v-card-item density="compact" class="py-0 text-medium-emphasis">
            <template #prepend>
                Участников: {{ project.participants }}
            </template>
            <template #append>
                <v-card-text>
                    <v-icon color="primary" icon="mdi-link-variant" />
                    <v-chip v-for="linked in project.linkedProjects" :key="linked.id" :to="`/project/${linked.id}`"
                        color="secondary" class="mr-1" variant="outlined">
                        #{{ linked.id }}
                    </v-chip>
                </v-card-text>
            </template>
        </v-card-item>
    </v-card>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import type { Project } from '@/types'
import { formatDate } from '@/utils/dateformat';

const props = defineProps<{ project: Project }>()

const statusColor = computed(() => {
    switch (props.project.status.toLowerCase()) {
        case 'в работе':
            return 'green'
        case 'завершён':
            return 'blue'
        case 'приостановлен':
            return 'orange'
        case 'архив':
            return 'grey'
        default:
            return 'primary'
    }
})
</script>