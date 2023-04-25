<template>
  <v-card>
    <v-card-title>
      <v-row class="py-5" align="center" justify="space-between" no-gutters>
        <v-col cols="12" lg="3"> Líderes técnicos </v-col>
        <v-btn @click="goToForm" color="primary"
          >Cadastrar novo Lead engineer</v-btn
        >
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="leads"
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
import { LeadEngineer } from '../../entities/lead-engineer';

export default {
  data() {
    return {
      itemsPerPage: 15,
      headers: [
        { title: 'Lead', align: 'start', key: 'name' },
        { title: 'Ações', align: 'start', key: 'actions', width: '10%' },
      ],
      leads: [
        {
          id: 1,
          name: 'Danilo Guinami',
        },
      ],
    };
  },
  methods: {
    editItem(item: LeadEngineer) {
      this.$router.push({
        name: 'lead-engineer-edit',
        params: { id: item.id },
      });
    },
    goToForm() {
      this.$router.push({ name: 'lead-engineer-create' });
    },
  },
};
</script>
