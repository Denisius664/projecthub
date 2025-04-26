<template>
    <v-container class="pt-10 d-flex flex-column ga-4" max-width="900px">
        <v-row>
            <v-col>
                <v-btn color="grey" density="compact" prepend-icon="mdi-arrow-left" :to="`/project/${$route.params.id}`">Назад к проекту</v-btn>
            </v-col>
        </v-row>
        <div class="d-flex flex-row ga-5">
            <span class="text-h3 text-medium-emphasis">Настройки проекта:</span>
            <h1 class="text-h3">AI в играх</h1>
        </div>
        <div>
            <p class="text-medium-emphasis">Создано: 21.01.2024</p>
        </div>
        <v-sheet rounded :elevation="2">
            <v-container>
                <v-row no-gutters>
                    <p class="text-h4">Основная информация</p>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        <p class="text-subtitle-1">Название проекта</p>
                        <v-text-field variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        <p class="text-subtitle-1">Описание прокта</p>
                        <v-text-field variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        <p class="text-subtitle-1">Статус</p>
                        <v-text-field variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        <p class="text-subtitle-1">Тэги</p>
                        <v-text-field variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        <p class="text-subtitle-1">Дата создания</p>
                        <v-text-field variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-sheet>

        <v-card title="Описание проекта"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, corporis! Dicta voluptatum veniam reprehenderit tempore esse corporis veritatis consectetur, labore perspiciatis qui eum quod voluptatibus fuga assumenda fugit provident. Repellat."></v-card>
        <v-card title="Тэги">
            <v-card-item>
                <v-chip color="primary" class="mr-1" variant="tonal">AI</v-chip>
                <v-chip color="primary" class="mr-1" variant="tonal">Robots</v-chip>
                <v-chip color="primary" class="mr-1" variant="tonal">Math</v-chip>
            </v-card-item>
        </v-card>
        <v-file-upload :multiple="true" clearable density="comfortable" variant="comfortable"></v-file-upload>
        <v-card title="README" text="Контент README файла в формате md"></v-card>
        <v-card title="Файлы проекта" text="Файлы проекта"></v-card>
    </v-container>
</template>
<script lang="ts" setup>
</script>
<style lang="">
    
</style>