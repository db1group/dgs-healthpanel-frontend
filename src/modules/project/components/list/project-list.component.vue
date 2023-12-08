<template>
  <confirmation-dialog
    :show="showDeleteDialog"
    :text="projectConfirmationDeleteText"
    @close="closeDialog"
    @remove="removeItem"
  />
  <v-card>
    <v-card-title>
      <v-row class="py-5" align="center" justify="space-between" no-gutters>
        <v-col cols="12" lg="3"> Projetos </v-col>
        <v-btn @click="goToForm" color="primary">Cadastrar novo projeto</v-btn>
      </v-row>
    </v-card-title>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Projetos"
      single-line
      hide-details
      class="pa-4"
    ></v-text-field>
    <v-card-text>
      <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="projects"
        item-value="name"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn @click="editItem(item)" icon>
            <v-icon size="small"> mdi-pencil </v-icon>
          </v-btn>
          <v-btn @click="openDialog(item)" icon>
            <v-icon size="small">mdi-delete</v-icon>
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
  import ConfirmationDialog from '../../../../components/confirmation-dialog/confirmation.dialog.vue';

  export default {
    components: {
      ConfirmationDialog,
    },
    data() {
      return {
        itemsPerPage: 15,
        projectService: new ProjectService(inject(HTTP_CLIENT) as HttpClient),
        headers: [
          {
            title: 'Projeto',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          {
            title: 'Leads',
            align: 'start',
            value: 'leadsNames',
          },
          {
            title: 'Ações',
            align: 'start',
            value: 'actions',
            width: '10%',
          },
        ] as any,
        projects: [] as Project[],
        search: '',
        projectToRemove: new Project(),
        showDeleteDialog: false,
      };
    },
    methods: {
      openDialog(item: Project) {
        this.showDeleteDialog = true;
        this.projectToRemove = item;
      },
      editItem(item: Project) {
        this.$router.push({ name: 'project-edit', params: { id: item.id } });
      },
      async removeItem() {
        await this.projectService.delete(this.projectToRemove.id).then(() => {
          this.$snackbar.open({
            text: 'Projeto deletado com sucesso',
            color: 'success',
            buttonColor: 'white',
          });
          this.showDeleteDialog = false;
          this.search = '';
          this.getAllProjects();
        });
      },
      closeDialog() {
        this.showDeleteDialog = false;
      },
      goToForm() {
        this.$router.push({ name: 'project-create' });
      },
      async getAllProjects() {
        this.projects = await this.projectService.getAllProjects();
      },
    },
    computed: {
      projectConfirmationDeleteText() {
        return `Tem certeza que deseja excluir o projeto ${this.projectToRemove.name}`;
      },
    },
    created() {
      this.$loader.open();
      this.getAllProjects().finally(() => this.$loader.close());
    },
  };
</script>
