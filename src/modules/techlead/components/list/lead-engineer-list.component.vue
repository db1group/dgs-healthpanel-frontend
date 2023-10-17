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
    <v-text-field
        v-model="search"
        label="Pesquisar Leads"
        single-line
        hide-details
        class="pa-4"
      ></v-text-field>
    <v-card-text>
      <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="leads"
        item-value="name"
        class="elevation-1"
        :search="search"
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
import { LeadEngineer } from '../../entities/lead-engineer';
import { LeadService } from '../../services/lead.service';
import { HTTP_CLIENT, HttpClient } from '../../../../infra/http/http';

export default {
  data() {
    return {
      itemsPerPage: 15,
      leadService: new LeadService(inject(HTTP_CLIENT) as HttpClient),
      headers: [
        { title: 'Lead', align: 'start', key: 'name' },
        { title: 'Em Capacitação?', align: 'start', key: 'inTrainingLabel' },
        { title: 'Email', align: 'start', key: 'email' },
        { title: 'Ações', align: 'start', key: 'actions', width: '10%' },
      ],
      leads: [] as LeadEngineer[],
      search: ''
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

    async getAllLeads() {
      this.leads = await this.leadService.getAllLeads();
    },
  },
  created() {
    this.getAllLeads();
  },
};
</script>
