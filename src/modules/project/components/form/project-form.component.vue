<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="12" lg="4">
            <v-text-field
              variant="outlined"
              v-model="project.name"
              label="Nome do projeto"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="4">
            <v-text-field
              variant="outlined"
              v-model="project.description"
              label="Descrição do projeto"
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
import { Project } from '../entities/project';

export default {
  data() {
    return {
      project: new Project(),
      leads: [
        { id: 1, name: 'Danilo Guinami' },
        { id: 2, name: 'João da Silva' },
      ],
    };
  },
  methods: {
    goToList() {
      this.$router.push({ name: 'project-list' });
    },
    save() {
      console.log(this.project);
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
};
</script>
