<template>
    <v-container class="pt-10" max-width="900px"    >
        <v-form>
            <v-container>
                <v-row class="pl-5 pb-4">
                    <p class="text-h4">Создание проекта</p>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field variant="solo" color="primary" v-model="projectName" label="Название" required />
                        <v-combobox variant="solo" color="primary" v-model="projectTags" label="Тэги" multiple chips clearable/>
                        <v-textarea variant="solo" color="primary" v-model="projectDescription" label="Подробное описание" />
                    </v-col>

                    <v-col>
                        <v-card outlined>
                            <v-card-title class="text-h6">Предметная область</v-card-title>
                            <v-divider />
                            <v-card-text style="max-height: 50vh;" class="pa-0 overflow-auto">
                                <v-treeview v-model="selectedSubjectArea" :items="subjectAreasTree" item-value="id"
                                    select-strategy="single-independent" selectable open-all open-on-click class="py-2" />
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row justify="end" class="mt-4 pr-5">
                    <v-btn variant="text" color="grey" class="mr-3" @click="cancel">Отмена</v-btn>
                    <v-btn color="primary" @click="createProject">Создать</v-btn>
                </v-row>
            </v-container>
        </v-form>
    </v-container>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ProjectCreate, SubjectAreaRead } from '@/api-client/types'
import { createProject as apiCreateProject } from '@/api-client/projects'
import { getSubjectAreas } from '@/api-client/subjectAreas'

const projectName = ref('');
const projectTags = ref([]);
const projectDescription = ref('');
const selectedSubjectArea = ref([]);

type TreeNode = {
  id: number;
  title: string;
  children?: TreeNode[];
};

const subjectAreas = ref<SubjectAreaRead[]>([])

// Преобразование subjectAreas к формату для v-treeview
function toTree(items: SubjectAreaRead[], parentId: number | null = null): TreeNode[] {
  return items
    .filter(area => area.parent_id === parentId)
    .map(area => ({
      id: area.id,
      title: area.name,
      children: toTree(items, area.id),
    }))
}

const subjectAreasTree = ref<TreeNode[]>([])
onMounted(() => {
  getSubjectAreas(0, 100).then(list => {
    subjectAreas.value = list
    subjectAreasTree.value = toTree(list)
  })
})

function cancel() {
  // Очистка формы
  projectName.value = ''
  projectTags.value = []
  projectDescription.value = ''
  selectedSubjectArea.value = []
}

async function createProject() {
  if (!projectName.value || selectedSubjectArea.value.length === 0) {
    alert('Заполните все обязательные поля!')
    return
  }

  const data: ProjectCreate = {
    title: projectName.value,
    description: projectDescription.value,
    status: 'в работе',
    keywords: projectTags.value,
    subject_area_id: selectedSubjectArea.value[0], // id выбранной области
    is_public: true,
  }

  try {
    const created = await apiCreateProject(data)
    alert('Проект успешно создан: ' + created.title)
    cancel()
  } catch (e) {
    alert('Ошибка при создании проекта')
    console.error(e)
  }
}
</script>
  
<style scoped>
.v-card-title {
    padding-bottom: 0;
}
</style>
  