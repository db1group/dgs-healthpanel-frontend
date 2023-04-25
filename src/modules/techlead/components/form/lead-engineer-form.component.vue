<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="12" lg="4">
            <v-text-field
              variant="outlined"
              v-model="lead.name"
              :rules="[rules.required]"
              label="Nome do lead"
            ></v-text-field>
          </v-col>

          <v-col cols="12" lg="4">
            <v-select
              :multiple="true"
              :items="projects"
              variant="outlined"
              v-model="lead.projects"
              label="Projeto"
              item-title="name"
              item-value="id"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="2">
            <v-switch
              variant="outlined"
              v-model="lead.inTraining"
              label="Em capacitação?"
              color="primary"
            />
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
import { Project } from '../../../project/entities/project';
import { LeadEngineer } from '../../entities/lead-engineer';
import { LeadService } from '../../services/lead.service';
import { HTTP_CLIENT, HttpClient } from '../../../../infra/http/http';
import { ProjectService } from '../../../project/services/project.service';
import rulesService from '../../../../infra/form-validation/rules.service';

export default {
  data() {
    return {
      lead: new LeadEngineer(),
      leadService: new LeadService(inject(HTTP_CLIENT) as HttpClient),
      projectService: new ProjectService(inject(HTTP_CLIENT) as HttpClient),
      rules: { required: rulesService.required },
      projects: [
        new Project({
          id: 1,
          name: 'Projeto 1',
        }),
      ],
    };
  },
  methods: {
    goToList() {
      this.$router.push({ name: 'lead-engineer-list' });
    },
    async save() {
      const { validate } = this.$refs.form as any;
      const { valid } = await validate();

      if (!valid) return;
      debugger;
      if (this.isEdit) {
        this.edit();
        return;
      }
      this.create();
    },
    create() {
      this.leadService
        .save(this.lead)
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
      this.leadService
        .edit(this.lead)
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
    async getAllProjects() {
      this.projects = await this.projectService.getAllProjects();
    },
    async getLeadById(leadId: string) {
      this.lead = await this.leadService.getLeadById(leadId);
    },
  },
  computed: {
    isEdit() {
      return !!this.$route.params.id;
    },
    title() {
      return this.isEdit
        ? 'Editar Lead engineer'
        : 'Cadastrar novo Lead engineer';
    },
    buttonLabel() {
      return this.isEdit ? 'Editar Lead engineer' : 'Salvar Lead engineer';
    },
  },
  created() {
    const id: string = this.$route.params.id as string;
    if (id) {
      this.getLeadById(id);
    }
  },
};
</script>
