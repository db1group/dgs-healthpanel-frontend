<template>
  <v-app>
    <loader-component />
    <snackbar-component />
    <sidebar-component :drawer="drawer" @input="drawer = !drawer" />

    <div v-if="isAuthenticated">
      <v-toolbar
        style="z-index: 101"
        color="#000"
        elevation="2"
        class="health-panel-process__header"
      >
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="toggleSidebar"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>Painel de saúde 2.0 </v-toolbar-title>
        <v-row justify="end" align="center">
          <v-col cols="6">
            <v-select
              disabled
              hide-details
              v-model="currentMonth"
              density="compact"
              max-width="200px"
              placeholder="Mês de competência"
              label="Mês de competência"
              :items="months"
              item-title="text"
              background-color="transparent"
              variant="outlined"
              ro
              item-value="value"
            />
          </v-col>
        </v-row>
      </v-toolbar>

      <section v-if="isAuthenticated">
        <router-view />
      </section>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { AuthAd, AUTH_AD } from './infra/auth/auth-ad';
import { HealthPanel } from './modules/health-panel-process/domain/health-panel';
import SidebarComponent from './components/sidebar/sidebar.component.vue';
import LoaderComponent from './components/loader/loader.component.vue';
import SnackbarComponent from './components/snackbar/snackbar.component.vue';

const authService: AuthAd = inject(AUTH_AD) as AuthAd;

let drawer = ref(false);

let isAuthenticated = ref(false);

let currentMonth = ref(new Date().getMonth() + 1);

let months = [
  { text: 'Janeiro', value: 1 },
  { text: 'Fevereiro', value: 2 },
  { text: 'Março', value: 3 },
  { text: 'Abril', value: 4 },
  { text: 'Maio', value: 5 },
  { text: 'Junho', value: 6 },
  { text: 'Julho', value: 7 },
  { text: 'Agosto', value: 8 },
  { text: 'Setembro', value: 9 },
  { text: 'Outubro', value: 10 },
  { text: 'Novembro', value: 11 },
  { text: 'Dezembro', value: 12 },
];

let showDialog = ref(false);

function toggleSidebar() {
  drawer.value = !drawer.value;
}

onMounted(async () => {
  isAuthenticated.value = await authService.connect();
});

function reactive(arg0: HealthPanel) {
  throw new Error('Function not implemented.');
}
</script>

<style scoped></style>
