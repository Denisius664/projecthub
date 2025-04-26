<template>
  <v-app-bar>
    <v-app-bar-title>
      <router-link class="text-h5 text-black text-decoration-none" to='/'>ProjectHub</router-link>
    </v-app-bar-title>

    <v-autocomplete filled dense hide-details density="compact" placeholder="Поиск проектов" variant="outlined"
      prepend-inner-icon="mdi-magnify"></v-autocomplete>
    <v-btn color="primary" prepend-icon="mdi-filter" class="text-subtitle-1 ml-3" variant="outlined">Фильтры</v-btn>
    <v-spacer></v-spacer>

    <template v-slot:append>
      <v-btn to="/project/create" class="mr-1" color="primary" variant="outlined">Создать проект</v-btn>
      <v-btn color="primary" icon="mdi-account"></v-btn>
    </template>
  </v-app-bar>

  <v-main>
    <router-view />
  </v-main>

  <AppFooter />
</template>

<script lang="ts" setup>
//
</script>
