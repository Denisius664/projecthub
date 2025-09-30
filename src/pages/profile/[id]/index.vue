<template>
  <v-row v-if="loading">
    <v-col cols="12" class="text-center">
      <v-progress-circular indeterminate color="primary" />
    </v-col>
  </v-row>
  <UserProfile v-else-if="user" :user="user" />
  <div v-else>Профиль пользователя не найден</div>
</template>
<script lang="ts" setup>
import type { UserRead } from '@/api-client/types'
import { getUser } from '@/api-client/users'
import type { User } from '@/types'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId: number = 'id' in route.params ? Number(route.params.id) : 0
const loading = ref(false)

let user = ref<User | null>()
onMounted(async () => {
  loading.value = true
  try {
    let userRead = await getUser(userId)
    user.value = await mapUserReadToUser(userRead)
  } finally {
    loading.value = false
  }
})

async function mapUserReadToUser(userRead: UserRead): Promise<User> {
  return {
    id: userRead.id.toString(),
    name: userRead.name,
    email: userRead.email,
    role: userRead.role,
    registeredAt: userRead.created_at,
    avatar: null
  }
}
</script>
<style lang="">

</style>