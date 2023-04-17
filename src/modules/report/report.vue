<template>
  <v-card>
    <v-card-title> Respostas do painel de saúde </v-card-title>
    <v-card-text>
      <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="projects"
        item-value="name"
        class="elevation-1"
      ></v-data-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
export default {
  data() {
    return {
      itemsPerPage: 15,
      headers: [
        {
          title: 'Projeto',
          align: 'start',
          sortable: false,
          key: 'project',
        },
        { title: 'Lead engineer', align: 'start', key: 'lead' },
        { title: 'Data da resposta', align: 'start', key: 'anwsered_at' },
      ],
      projects: [
        {
          project: 'Al5 Bank',
          lead: 'Danilo Guinami',
          anwsered_at: '2021-05-01',
        },
      ],
    };
  },
};
</script>
