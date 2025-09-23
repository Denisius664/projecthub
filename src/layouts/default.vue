<template>
  <v-app-bar>
    <v-app-bar-title>
      <router-link class="text-h5 text-black text-decoration-none" to="/">ProjectHub</router-link>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <template v-slot:append>
      <v-btn to="/project/create" class="mr-1" color="primary" variant="outlined">Создать проект</v-btn>
      <template v-if="isAuthenticated">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-account" color="primary" />
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title><router-link :to="`/profile/${user?.id}`">{{ user?.name
                  }}</router-link></v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item @click="logout">
              <v-list-item-title>Выйти</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <v-btn to="/login" color="primary" variant="tonal">Войти</v-btn>
      </template>
    </template>
  </v-app-bar>
  <v-main> <router-view /> </v-main>
  <AppFooter />
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { user, isAuthenticated } = storeToRefs(authStore)

function logout() {
  authStore.logout()
}
</script>
