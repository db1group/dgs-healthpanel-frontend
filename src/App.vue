<template>
  <v-app>
    <health-panel-process-component v-if="isAuthenticated" />
  </v-app>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import HealthPanelProcessComponent from './modules/health-panel-process/health-panel-process.component.vue';
import { AuthAd, AUTH_AD } from './infra/auth/auth-ad';

const authService: AuthAd = inject(AUTH_AD) as AuthAd;

let isAuthenticated = ref(false);

onMounted(async () => {
  isAuthenticated.value = await authService.connect();
});
</script>

<style scoped></style>
