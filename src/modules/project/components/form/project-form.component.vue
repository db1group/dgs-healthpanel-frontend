<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="12" lg="4">
            <v-text-field
              :rules="[rules.required]"
              variant="outlined"
              v-model="project.name"
              label="Nome do projeto"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="4">
            <v-text-field
              variant="outlined"
              :rules="[rules.required]"
              v-model="project.costCenter"
              label="Centro de custo"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="4">
            <v-select
              :items="leads"
              variant="outlined"
              v-model="project.lead"
              label="Lead do projeto"
              required
              item-title="name"
              item-value="id"
            ></v-select>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="goToList" variant="outlined" size="large" text
        >Cancelar</v-btn
      >
      <v-btn
        @click="save"
        variant="outlined"
        size="large"
        color="primary"
        text
        >{{ buttonLabel }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { inject } from 'vue';
import { LeadService } from '../../../techlead/services/lead.service';
import { Project } from '../../entities/project';
import { HTTP_CLIENT, HttpClient } from '../../../../infra/http/http';
import { ProjectService } from '../../services/project.service';
import { LeadEngineer } from '../../../techlead/entities/lead-engineer';
import rulesService from '../../../../infra/form-validation/rules.service';

export default {
  data() {
    return {
      project: new Project(),
      leadsService: new LeadService(inject(HTTP_CLIENT) as HttpClient),
      projectService: new ProjectService(inject(HTTP_CLIENT) as HttpClient),
      leads: [] as LeadEngineer[],
      rules: {
        required: rulesService.required,
      },
    };
  },
  methods: {
    goToList() {
      this.$router.push({ name: 'project-list' });
    },
    async save() {
      const { validate } = this.$refs.form as any;
      const { valid } = await validate();

      if (!valid) return;
      if (this.isEdit) {
        this.edit();
        return;
      }
      this.create();
    },
    create() {
      this.projectService
        .save(this.project)
        .then(() => {
          this.$snackbar.open({
            text: 'Projeto cadastrado com sucesso',
            color: 'success',
            buttonColor: 'white',
          });
        })
        .catch(() => {
          this.$snackbar.open({
            text: 'Erro ao cadastrar projeto',
            color: 'danger',
            buttonColor: 'white',
          });
        });
    },
    edit() {
      this.projectService
        .edit(this.project)
        .then(() => {
          this.$snackbar.open({
            text: 'Projeto editado com sucesso',
            color: 'success',
            buttonColor: 'white',
          });
        })
        .catch(() => {
          this.$snackbar.open({
            text: 'Erro ao editar projeto',
            color: 'danger',
            buttonColor: 'white',
          });
        });
    },
    async getAllLeads() {
      this.leads = await this.leadsService.getAllLeads();
    },
    async getProjectById(projectId: string) {
      this.project = await this.projectService.getProjectById(projectId);
    },
  },
  computed: {
    isEdit() {
      return !!this.$route.params.id;
    },
    title() {
      return this.isEdit ? 'Editar projeto' : 'Cadastrar novo projeto';
    },
    buttonLabel() {
      return this.isEdit ? 'Editar projeto' : 'Salvar projeto';
    },
  },
  created() {
    const id: string = this.$route.params.id as string;
    if (id) {
      this.getProjectById(id);
    }
  },
};
</script>
