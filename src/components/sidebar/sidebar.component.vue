<template>
  <v-navigation-drawer
    :model-value="drawer"
    @update:model-value="close"
    width="300px"
    temporary
  >
    <v-list-item
      prepend-avatar="/logo.png"
      :title="store.username"
    ></v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        @click="goToPage('form')"
        prepend-icon="mdi-view-dashboard"
        title="Formulário"
        value="form"
      ></v-list-item>
      <v-list-item
        v-if="false"
        prepend-icon="mdi-forum"
        title="Relatório"
        value="report"
        @click="goToPage('report')"
      ></v-list-item>
      <v-list-item
        v-if="false"
        title="Ranking"
        prepend-icon="mdi-podium-gold"
        value="ranking"
        @click="goToPage('ranking')"
      ></v-list-item>
      <v-list-item
        v-if="false"
        title="Painel de saúde"
        prepend-icon="mdi-chart-line"
        value="health-panel-bi"
        @click="goToPage('health-panel-bi')"
      ></v-list-item>
      <v-list-item
        v-if="false"
        title="Projetos"
        prepend-icon="mdi-domain"
        value="project"
        @click="goToPage('project-list')"
      ></v-list-item>
      <v-list-item
        v-if="false"
        title="Lead engineer"
        prepend-icon="mdi-account-group"
        value="techlead"
        @click="goToPage('lead-engineer-list')"
      ></v-list-item>
      <v-spacer></v-spacer>
      <v-list-item
        title="Download DB1 CLI"
        prepend-icon="mdi-terminal"
        @click="downloadCli"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { authStore } from '../../store/auth-store';

  const emit = defineEmits(['input']);
  const store = authStore();
  const router = useRouter();

  interface Props {
    drawer: boolean;
  }

  function goToPage(name: string) {
    router.push({
      name,
    });
  }

  function downloadCli() {
    window.open(
      'https://github.com/db1group/dgs-cli/releases/download/v1.0.0/dgscli-1.0.0.zip',
      '_blank',
    );
  }

  const { drawer } = defineProps<Props>();

  function close(data: boolean) {
    emit('input', false);
  }
</script>
