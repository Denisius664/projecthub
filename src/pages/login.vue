<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card class="pa-6" max-width="400" elevation="6">
      <v-card-title class="text-h5 text-center">Вход в систему</v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="formRef">
          <v-text-field
            v-model="username"
            label="Логин"
            variant="outlined"
            prepend-icon="mdi-account"
            :rules="[rules.required]"
          />
          <v-text-field
            v-model="password"
            label="Пароль"
            type="password"
            variant="outlined"
            prepend-icon="mdi-lock"
            :rules="[rules.required]"
          />
        </v-form>
        <v-alert v-if="error" type="error" class="mt-3">
          {{ error }}
        </v-alert>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn :loading="loading" color="primary" @click="onSubmit">
          Войти
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from "@/stores/auth"

// Состояния
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
const valid = ref(false)
const formRef = ref()

const authStore = useAuthStore();

const rules = {
  required: (v: string) => !!v || 'Поле обязательно'
}

const router = useRouter()

async function onSubmit() {
  error.value = null
  const form = formRef.value as any
  if (!(await form.validate())) return

  loading.value = true
  try {
    await authStore.login(username.value, password.value)
    // редирект
    router.push('/')
  } catch (e: any) {
    error.value = 'Неверный логин или пароль'
  } finally {
    loading.value = false
  }
}
</script>
