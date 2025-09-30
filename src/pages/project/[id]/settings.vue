<template>
    <v-progress-circular v-if="loading" indeterminate color="primary" class="ma-6" />
    <project-settings v-else-if="projSettings" :initial-settings="projSettings" />
    <div v-else>Настроек проекта не найдено</div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getProject } from '@/api-client/projects'
import type { ProjectRead } from '@/api-client/types'
import type { ProjectSettings } from '@/types'

const loading = ref(false)
const route = useRoute()
const projectId: number = 'id' in route.params ? Number(route.params.id) : 0

const projSettings = ref<ProjectSettings | null>(null)

function mapProjectReadToSettings(api: ProjectRead): ProjectSettings {
    return {
        id: String(api.id),
        title: api.title,
        status: api.status,
        createdAt: api.created_at,
        description: api.description ?? '',
        tags: api.keywords ?? [],
        isPublic: api.is_public ?? true,
    }
}

onMounted(async () => {
    loading.value = true
    try {
        const apiProject = await getProject(projectId)
        projSettings.value = mapProjectReadToSettings(apiProject)
    } catch (e) {
        console.error('Ошибка загрузки настроек проекта', e)
    } finally {
        loading.value = false
    }
})

</script>
<style lang="">

</style>