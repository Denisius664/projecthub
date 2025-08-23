<template>
  <project-full :project="exampleProject"/>
</template>
  
<script setup lang="ts">
const exampleProject = {
  id: 'ID123',
  title: 'AI в играх',
  status: 'В работе',
  createdAt: '21.01.2024',
  description: 'Проект по исследованию применения искусственного интеллекта в видеоиграх.',
  tags: ['AI', 'Robots', 'Math'],
  knowledgeArea: ['ML', 'AI', 'CNN'],
  participants: 6,
  citationIndex: 2,
  linkedProjects: [{ id: 'ID50' }, { id: 'ID129' }]
}
</script>
  