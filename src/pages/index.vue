<template>
  <v-container max-width="900">
    <div>
      <div class="ml-4 mb-3">
        <h1 class="text-h4 font-weight-bold">Проекты</h1>
      </div>
      <v-container>
        <v-row v-for="i in [1, 2, 3, 4, 5, 6]">
          <v-col>
            <project-card></project-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
//
</script>
