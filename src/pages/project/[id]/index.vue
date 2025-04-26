<template>
    <v-container class="pt-10 d-flex flex-column ga-4" max-width="900px">
        <v-breadcrumbs class="text-subtitle-2 py-0 text-disabled pt-1" density="compact" :items="['ML', 'AI', 'CNN']">
            <template v-slot:divider>
                <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
        </v-breadcrumbs>
        <div class="d-flex justify-space-between">
            <div class="d-flex ga-5">
                <span class="text-h3 text-medium-emphasis">#{{ $route.params.id }}</span>
                <h1 class="text-h3">AI в играх</h1>
            </div>
            <v-btn :to="`/project/${$route.params.id}/settings`" color="primary" icon="mdi-cog"></v-btn>
        </div>
        <div>
            <p class="text-medium-emphasis">Создано: 21.01.2024</p>
        </div>
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