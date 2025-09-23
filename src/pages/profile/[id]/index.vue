<template>
  <UserProfile v-if="user" :user="user" />
  <div v-else>Профиль пользователя не найден</div>
</template>
<script lang="ts" setup>
import type { UserRead } from '@/api-client/types'
import { getUser } from '@/api-client/users'
import type { User } from '@/types'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId: number = 'id' in route.params ? Number(route.params.id) : 0

let user = ref<User | null>()
onMounted(async () => {
  let userRead = await getUser(userId)
  user.value = await mapUserReadToUser(userRead)
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