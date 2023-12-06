<template>
  <v-app>
    <loader-component />
    <snackbar-component />
    <sidebar-component
      v-if="isAuthenticated"
      :drawer="drawer"
      @input="drawer = !drawer"
    />

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

        <v-toolbar-title> {{ $t('appName') }} </v-toolbar-title>
      </v-toolbar>

      <section
        v-if="isAuthenticated"
        :style="resizeStyle"
      >
        <router-view />
      </section>
    </div>
  </v-app>
</template>

<script setup lang="ts">
  import { inject, onMounted, ref, computed } from 'vue';
  import { AuthAd, AUTH_AD } from './infra/auth/auth-ad';
  import SidebarComponent from './components/sidebar/sidebar.component.vue';
  import LoaderComponent from './components/loader/loader.component.vue';
  import SnackbarComponent from './components/snackbar/snackbar.component.vue';

  const authService: AuthAd = inject(AUTH_AD) as AuthAd;

  let drawer = ref(false);

  let isAuthenticated = ref(false);

  function toggleSidebar() {
    drawer.value = !drawer.value;
  }
  
  const resizeStyle = computed(() => {
    return {
      marginLeft: drawer.value ? '300px' : '0',
      transition: '0.2s',
    };
  });
  
  onMounted(async () => {
    isAuthenticated.value = await authService.connect();
  });
</script>
