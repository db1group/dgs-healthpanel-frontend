<template>
  <v-app>
    <apresentation-dialog @input="setProject" :value="showDialog" />
    <health-panel-process-component v-if="isAuthenticated" />
  </v-app>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import HealthPanelProcessComponent from './modules/health-panel-process/health-panel-process.component.vue';
import { AuthAd, AUTH_AD } from './infra/auth/auth-ad';
import ApresentationDialog from './components/apresentation-dialog/apresentation.dialog.vue';

const authService: AuthAd = inject(AUTH_AD) as AuthAd;

let project = ref('');

let isAuthenticated = ref(false);

let showDialog = ref(false);

function setProject(projectData: string) {
  project.value = projectData;
  showDialog.value = false;
}

onMounted(async () => {
  isAuthenticated.value = await authService.connect();
  showDialog.value = isAuthenticated.value;
});
</script>

<style scoped></style>
