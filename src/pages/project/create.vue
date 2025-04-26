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
                        <v-combobox variant="solo" color="primary" v-model="projectTags" label="Тэги" multiple chips clearable
                            :items="availableTags" />
                        <v-textarea variant="solo" color="primary" v-model="projectDescription" label="Подробное описание" />
                    </v-col>

                    <v-col>
                        <v-card outlined>
                            <v-card-title class="text-h6">Предметная область</v-card-title>
                            <v-divider />
                            <v-card-text style="max-height: 50vh;" class="pa-0 overflow-auto">
                                <v-treeview v-model="selectedSubjectArea" :items="subjectAreas" item-value="id"
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
import { ref } from 'vue';

const projectName = ref('');
const projectTags = ref([]);
const projectDescription = ref('');
const selectedSubjectArea = ref([]);

const availableTags = ['analytics', 'research', 'machine learning', 'education', 'development'];

const subjectAreas = [
    {
        id: 1,
        title: 'Technology',
        children: [
            {
                id: 2, title: 'Artificial Intelligence', children: [
                    { id: 3, title: 'Machine Learning' },
                    { id: 4, title: 'Deep Learning' }
                ]
            },
        ],
    },
    {
        id: 5,
        title: 'Education',
        children: [
            { id: 6, title: 'Higher Education' },
            { id: 7, title: 'K-12' }
        ],
    },
];

function cancel() {
    // Очистка формы или возврат назад
}

function createProject() {
    // Логика создания проекта
}
</script>
  
<style scoped>
.v-card-title {
    padding-bottom: 0;
}
</style>
  