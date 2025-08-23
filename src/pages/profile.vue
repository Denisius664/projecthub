<template>
    <UserProfile :user="exampleUser"/>
</template>
<script lang="ts" setup>

const exampleUser = {
  id: 'ID10021',
  fullName: 'Иван Иванов',
  shortName: 'Иванов И.И.',
  email: 'ivanov@utmn.ru',
  role: 'Администратор',
  registeredAt: '22.07.2024',
  avatar: 'https://cdn.vuetifyjs.com/images/profiles/marcus.jpg'
}
</script>
<style lang="">
    
</style>