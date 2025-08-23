<template>
  <v-container max-width="900">
    <div>
      <div class="ml-4 mb-3">
        <h1 class="text-h4 font-weight-bold">Проекты</h1>
      </div>
      <v-container>
        <v-row v-for="i in projects">
          <v-col>
            <project-card :project="i"></project-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
let projects = [
  {
    id: "ID001",
    title: "Интеллектуальный анализ данных",
    status: "В работе",
    createdAt: "2025-02-01",
    description: "Проект посвящён разработке системы для интеллектуального анализа больших объёмов данных.",
    tags: ["AI", "Data Mining"],
    knowledgeArea: ["Информатика", "Искусственный интеллект"],
    participants: 5,
    citationIndex: 3,
    linkedProjects: [{ id: "ID010" }, { id: "ID004" }]
  },
  {
    id: "ID002",
    title: "Роботизированная платформа для сельского хозяйства",
    status: "Завершён",
    createdAt: "2024-12-15",
    description: "Создание автономной системы для мониторинга и обработки сельскохозяйственных полей.",
    tags: ["Robotics", "AgriTech"],
    knowledgeArea: ["Механика", "Сельское хозяйство"],
    participants: 8,
    citationIndex: 5,
    linkedProjects: [{ id: "ID005" }]
  },
  {
    id: "ID003",
    title: "Анализ социальных сетей",
    status: "В работе",
    createdAt: "2025-03-10",
    description: "Изучение поведенческих паттернов пользователей в популярных социальных сетях.",
    tags: ["Social", "ML"],
    knowledgeArea: ["Социология", "Информатика"],
    participants: 6,
    citationIndex: 2,
    linkedProjects: [{ id: "ID001" }, { id: "ID002" }]
  },
  {
    id: "ID004",
    title: "Прогнозирование погодных условий",
    status: "Приостановлен",
    createdAt: "2024-11-20",
    description: "Моделирование и предсказание климатических изменений с помощью нейросетей.",
    tags: ["Climate", "Forecast"],
    knowledgeArea: ["Физика", "География"],
    participants: 4,
    citationIndex: 1,
    linkedProjects: []
  },
  {
    id: "ID005",
    title: "Система голосового управления для автомобилей",
    status: "В работе",
    createdAt: "2025-01-05",
    description: "Разработка безопасной и адаптивной голосовой системы для вождения.",
    tags: ["Voice", "UX"],
    knowledgeArea: ["Лингвистика", "Информатика"],
    participants: 7,
    citationIndex: 4,
    linkedProjects: [{ id: "ID002" }]
  },
  {
    id: "ID006",
    title: "Разработка образовательной платформы",
    status: "Архив",
    createdAt: "2023-10-01",
    description: "Создание платформы дистанционного обучения с элементами геймификации.",
    tags: ["Education", "Gamification"],
    knowledgeArea: ["Педагогика", "IT"],
    participants: 10,
    citationIndex: 6,
    linkedProjects: [{ id: "ID009" }]
  },
  {
    id: "ID007",
    title: "Система мониторинга здоровья",
    status: "Завершён",
    createdAt: "2024-08-18",
    description: "Система анализа биомедицинских данных для предиктивной диагностики заболеваний.",
    tags: ["Health", "IoT"],
    knowledgeArea: ["Медицина", "Информатика"],
    participants: 9,
    citationIndex: 7,
    linkedProjects: []
  },
  {
    id: "ID008",
    title: "Автоматизация документооборота",
    status: "В работе",
    createdAt: "2025-04-02",
    description: "Цель проекта — минимизация ручной обработки документов в организациях.",
    tags: ["Automation", "OCR"],
    knowledgeArea: ["Делопроизводство", "Информационные системы"],
    participants: 3,
    citationIndex: 2,
    linkedProjects: [{ id: "ID006" }]
  },
  {
    id: "ID009",
    title: "Умный дом: управление энергопотреблением",
    status: "Приостановлен",
    createdAt: "2024-05-10",
    description: "Разработка системы управления энергопотреблением в жилых помещениях.",
    tags: ["Smart Home", "Energy"],
    knowledgeArea: ["Энергетика", "Автоматизация"],
    participants: 5,
    citationIndex: 3,
    linkedProjects: [{ id: "ID007" }]
  },
  {
    id: "ID010",
    title: "Обработка естественного языка для анализа новостей",
    status: "В работе",
    createdAt: "2025-02-20",
    description: "Проект направлен на автоматическую фильтрацию и анализ новостных потоков.",
    tags: ["NLP", "News"],
    knowledgeArea: ["Лингвистика", "Искусственный интеллект"],
    participants: 4,
    citationIndex: 2,
    linkedProjects: [{ id: "ID003" }]
  }
]
</script>
