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
          <v-btn @click="editItem(item)" icon>
            <v-icon size="small"> mdi-pencil </v-icon>
          </v-btn>
          <v-btn
            v-model="dialogConfirmation.show"
            @click="openDialog(item)"
            icon
          >
            <v-icon size="small"> mdi-delete </v-icon>
            <dialog-confirmation-component @remove="removeItem()" />
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
  import DialogConfirmationComponent from '../../../../components/dialog-confirmation/dialog-confirmation.component.vue';

  export default {
    data() {
      return {
        itemsPerPage: 15,
        leadService: new LeadService(inject(HTTP_CLIENT) as HttpClient),
        headers: [
          { title: 'Lead', align: 'start', value: 'name' },
          {
            title: 'Em Capacitação?',
            align: 'start',
            value: 'inTrainingLabel',
          },
          { title: 'Email', align: 'start', value: 'email' },
          { title: 'Ações', align: 'start', value: 'actions', width: '10%' },
        ] as any,
        leads: [] as LeadEngineer[],
        search: '',
        dialogConfirmation: this.$dialogConfirmation,
        idItemToRemove: '',
      };
    },
    methods: {
      openDialog(item: LeadEngineer) {
        this.dialogConfirmation.open({
          text: `Tem certeza que deseja remover o Lead ${item.name}?`,
        });
        this.idItemToRemove = item.id;
      },
      editItem(item: LeadEngineer) {
        this.$router.push({
          name: 'lead-engineer-edit',
          params: { id: item.id },
        });
      },
      async removeItem() {
        await this.leadService.delete(this.idItemToRemove).then(() => {
          this.$snackbar.open({
            text: 'Lead deletado com sucesso',
            color: 'success',
            buttonColor: 'white',
          });
          this.dialogConfirmation.close();
          this.search = '';
          this.getAllLeads();
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
    components: { DialogConfirmationComponent },
  };
</script>
