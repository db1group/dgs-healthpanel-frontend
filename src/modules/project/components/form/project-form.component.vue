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
            <v-select
              variant="outlined"
              :items="costCenters"
              return-object
              :rules="[rules.required]"
              v-model="project.costCenter"
              item-title="name"
              item-value="id"
              label="Centro de custo"
              required
            />
          </v-col>
          <v-col cols="12" lg="4">
            <v-select
              multiple
              :items="leads"
              variant="outlined"
              v-model="project.leads"
              return-object
              label="Lead do projeto"
              item-title="name"
              item-value="id"
              :rules="[rules.required]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="4">
            <v-text-field
              variant="outlined"
              v-model="project.sonarName"
              label="Nome no Sonar"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="4">
            <v-text-field
              variant="outlined"
              v-model="project.sonarUrl"
              label="URL Sonar"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="4">
            <v-text-field
              variant="outlined"
              v-model="project.sonarToken"
              label="Token Sonar"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="4">
            <v-textarea
              variant="outlined"
              v-model="project.sonarKeys"
              label="IDs dos projetos separados por vírgula"
              auto-grow
            ></v-textarea>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="goToList" variant="outlined" size="large">Cancelar</v-btn>
      <v-btn @click="save" variant="outlined" size="large" color="primary">{{
        buttonLabel
      }}</v-btn>
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
  import { CostCenter } from '../../entities/cost-center';

  export default {
    data() {
      return {
        project: new Project(),
        costCenters: [] as CostCenter[],
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
      getCostCenters() {
        this.projectService
          .getAllCenterOfCosts()
          .then((costCenters: CostCenter[]) => {
            this.costCenters = costCenters;
          })
          .catch(() => {
            this.$snackbar.open({
              text: 'Erro ao buscar centros de custo',
              color: 'danger',
              buttonColor: 'white',
            });
          });
      },
      create() {
        this.projectService
          .save(this.project as Project)
          .then(() => {
            this.$snackbar.open({
              text: 'Projeto cadastrado com sucesso',
              color: 'success',
              buttonColor: 'white',
            });
            this.$router.push({ name: 'project-list' });
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
          .edit(this.project as Project)
          .then(() => {
            this.$snackbar.open({
              text: 'Projeto editado com sucesso',
              color: 'success',
              buttonColor: 'white',
            });
            this.$router.push({ name: 'project-list' });
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
      this.getAllLeads();
      this.getCostCenters();
    },
  };
</script>
