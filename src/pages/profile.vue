<template>
    <v-container class="pt-10" max-width="900px">
        <v-row>
            <v-col cols="3">
                <v-avatar color="grey" size="150">
                    <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg" cover></v-img>
                </v-avatar>
            </v-col>
            <v-col>
                <h1 class="text-h4">Иван Иванов</h1>
                <span class="text-subtitle-1 text-medium-emphasis">ivan@utmn.ru</span>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card variant="elevated" elevation="4">
                    <v-container>
                        <v-row>
                            <v-col>
                                <p class="text-subtitle-1 text-medium-emphasis">ID</p>
                                <p class="text-body-1">#ID10021</p>
                            </v-col>
                            <v-col>
                                <p class="text-subtitle-1 text-medium-emphasis">Роль</p>
                                <p class="text-body-1">Администратор</p>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <p class="text-subtitle-1 text-medium-emphasis">ФИО</p>
                                <p class="text-body-1">Иванов И.И.</p>
                            </v-col>
                            <v-col>
                                <p class="text-subtitle-1 text-medium-emphasis">Дата регистрации</p>
                                <p class="text-body-1">22.07.2024</p>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <p class="text-subtitle-1 text-medium-emphasis">email</p>
                                <p class="text-body-1">ivanov@utmn.ru</p>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts" setup>

</script>
<style lang="">
    
</style>