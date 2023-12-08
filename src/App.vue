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

<script lang="ts">
  import { inject } from 'vue';
  import { AuthAd, AUTH_AD } from './infra/auth/auth-ad';
  import SidebarComponent from './components/sidebar/sidebar.component.vue';
  import LoaderComponent from './components/loader/loader.component.vue';
  import SnackbarComponent from './components/snackbar/snackbar.component.vue';

  export default {
    components: {
      SidebarComponent,
      LoaderComponent,
      SnackbarComponent,
    },
    data() {
      return {
        authService: inject(AUTH_AD) as AuthAd,
        drawer: false,
        isAuthenticated: false,
      };
    },
    methods: {
      toggleSidebar() {
        this.drawer = !this.drawer;
      },
    },
    async mounted() {
      this.isAuthenticated = await this.authService.connect();
    },
  };
</script>
