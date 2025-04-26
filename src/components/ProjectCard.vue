<template>
    <v-card variant="elevated" elevation="4">
        <v-card-item>
            <v-breadcrumbs class="text-subtitle-2 py-0 text-disabled pt-1" density="compact" :items="['ML', 'AI', 'CNN']">
                <template v-slot:divider>
                    <v-icon icon="mdi-chevron-right"></v-icon>
                </template>
            </v-breadcrumbs>
            <v-card-title>
                <v-list-item :to="`/project/ID123`" class="pa-0">
                    <span class="text-medium-emphasis">#ID123</span> Название проекта
                    <v-chip color="green" class="font-weight-medium" variant="tonal">В работе</v-chip>
                </v-list-item>
            </v-card-title>

            <v-card-subtitle>Создан: 12.02.2025</v-card-subtitle>

            <template v-slot:append>
                <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
            </template>
        </v-card-item>

        <v-card-text class="pb-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum, nam similique quam esse
            natus ipsa pariatur rerum labore quo officia mollitia architecto. Ab aliquid rem nemo quis sequi cumque ut?
        </v-card-text>
        <v-card-item density="compact" class="pb-0 mb-n4">
            <template v-slot:prepend>
                <v-chip color="primary" class="mr-1" variant="tonal">AI</v-chip>
                <v-chip color="primary" class="mr-1" variant="tonal">Robots</v-chip>
                <v-chip color="primary" class="mr-1" variant="tonal">Math</v-chip>
            </template>
            <template v-slot:append>
                <v-card-text class="text-medium-emphasis">
                    Индекс цитирования: 2
                </v-card-text>
            </template>
        </v-card-item>
        <v-card-item density="compact" class="py-0 text-medium-emphasis">
            <template v-slot:prepend>
                6 учатников
            </template>
            <template v-slot:append>
                <v-card-text>
                    <v-icon color="primary" icon="mdi-link-variant"></v-icon>
                    <v-chip :to="`/project/ID129`" color="secondary" class="mr-1" variant="outlined">#ID129</v-chip>
                    <v-chip :to="`/project/ID50`" color="secondary" class="mr-1" variant="outlined">#ID50</v-chip>
                </v-card-text>
            </template>
        </v-card-item>
    </v-card>
</template>
<script setup lang="ts">

</script>
