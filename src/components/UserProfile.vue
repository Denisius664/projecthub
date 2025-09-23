<template>
    <v-container class="pt-10" max-width="900px">
        <v-row>
            <v-col cols="3">
                <v-avatar color="grey" size="150">
                    <v-img
                        :src="user.avatar || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'"
                        cover />
                </v-avatar>
            </v-col>
            <v-col>
                <h1 class="text-h4">{{ user.name }}</h1>
                <span class="text-subtitle-1 text-medium-emphasis">{{ user.email }}</span>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card variant="elevated" elevation="4">
                    <v-container>
                        <v-row>
                            <v-col>
                                <p class="text-subtitle-1 text-medium-emphasis">Роль</p>
                                <p class="text-body-1">{{ user.role }}</p>
                            </v-col>
                            <v-col>
                                <p class="text-subtitle-1 text-medium-emphasis">Дата регистрации</p>
                                <p class="text-body-1">{{ formatDate(user.registeredAt) }}</p>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
// import { defineProps } from 'vue'
import type { User } from '@/types'
import { formatDate } from '@/utils/dateformat';

const props = defineProps<{
    user: User
}>()
</script>