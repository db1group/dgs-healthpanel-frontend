<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="12" lg="4">
            <v-text-field
              variant="outlined"
              v-model="lead.name"
              label="Nome do lead"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" lg="4">
            <v-select
              :items="projects"
              variant="outlined"
              v-model="lead.projects"
              label="Projeto"
              required
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
              required
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
import { Project } from '../../../project/components/entities/project';
import { LeadEngineer } from '../entities/lead-engineer';

export default {
  data() {
    return {
      lead: new LeadEngineer(),
      projects: [
        new Project([
          {
            id: 1,
            name: 'Projeto 1',
          },
        ]),
      ],
    };
  },
  methods: {
    goToList() {
      this.$router.push({ name: 'lead-engineer-list' });
    },
    save() {
      console.log(this.lead);
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
};
</script>
