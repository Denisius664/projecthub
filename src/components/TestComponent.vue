<script setup lang="ts">
import { onMounted } from 'vue'
import { login, getMe } from './../api-client/auth'
import { getProjects } from './../api-client/projects'

// Введите свои тестовые данные для логина
const testLogin = async () => {
  // try {
  //   await login({ username: 'user@example.com', password: 'string' })
  //   console.log('Login OK')
  //   const me = await getMe()
  //   console.log('Текущий пользователь:', me)
  // } catch (e) {
  //   console.error('Ошибка логина или getMe', e)
  // }
}

const testProjects = async () => {
  try {
    const projects = await getProjects()
    console.log('Проекты:', projects)
  } catch (e) {
    console.error('Ошибка получения проектов', e)
  }
}

// При монтировании компонента запускаем тесты
onMounted(() => {
  testLogin()
  testProjects()
})
</script>

<template>
  <div>
    <h2>Проверь консоль браузера!</h2>
  </div>
</template>