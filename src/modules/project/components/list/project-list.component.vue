<template>
  <v-card>
    <v-card-title>
      <v-row class="py-5" align="center" justify="space-between" no-gutters>
        <v-col cols="12" lg="3"> Projetos </v-col>
        <v-btn @click="goToForm" color="primary">Cadastrar novo projeto</v-btn>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="projects"
        item-value="name"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn @click="editItem(item.raw)" icon>
            <v-icon size="small"> mdi-pencil </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { inject } from 'vue';
import { Project } from '../../entities/project';
import { ProjectService } from '../../services/project.service';
import { HTTP_CLIENT, HttpClient } from '../../../../infra/http/http';

export default {
  data() {
    return {
      itemsPerPage: 15,
      projectService: new ProjectService(inject(HTTP_CLIENT) as HttpClient),
      headers: [
        {
          title: 'Projeto',
          align: 'start',
          sortable: false,
          key: 'name',
        },
        {
          title: 'Leads',
          align: 'start',
          key: 'leadNames'
        },
        {
          title: 'Ações',
          align: 'start',
          key: 'actions',
          width: '10%'
        },
      ],
      projects: [] as Project[],
    };
  },
  methods: {
    editItem(item: Project) {
      this.$router.push({ name: 'project-edit', params: { id: item.id } });
    },
    goToForm() {
      this.$router.push({ name: 'project-create' });
    },

    async getAllProjects() {
      this.projects = await this.projectService.getAllProjects();
    },
  },
  created() {
    this.getAllProjects();
  },
};
</script>
