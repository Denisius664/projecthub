<template>
    <project-settings :initial-settings="exampleProjectSettings" />
</template>
<script lang="ts" setup>
const exampleProjectSettings = {
    id: 'ID123',
    title: 'AI в играх',
    description: 'Проект посвящён внедрению искусственного интеллекта в игровые механики.',
    status: 'В работе',
    tags: ['AI', 'Игры', 'Обучение'],
    createdAt: '2024-01-21',
}
</script>
<style lang="">
    
</style>