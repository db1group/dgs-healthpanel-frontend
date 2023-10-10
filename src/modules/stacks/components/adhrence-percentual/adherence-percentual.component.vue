<template>
  <v-card-title class="ma-3">
    Percentual de Aderência
  </v-card-title>
  <v-divider></v-divider>
  <v-card-item >
    <v-card color="green" class="pa-3 mb-3" variant="outlined">
      <v-card-title> Adote: {{ adherenceResponse!.adoptPercentage }} </v-card-title>
    </v-card>
    <v-card color="red" class="pa-3 mb-3" variant="outlined">
      <v-card-title> Evite: {{ adherenceResponse!.avoidPercentage }} </v-card-title>
    </v-card>
    <v-card color="blue" class="pa-3 mb-3" variant="outlined">
      <v-card-title> Experimente: {{ adherenceResponse!.experimentPercentage }} </v-card-title>
    </v-card>
    <v-card color="yellow" class="pa-3 mb-3" variant="outlined">
      <v-card-title> Avalie: {{ adherenceResponse!.assessPercentage }} </v-card-title>
    </v-card>
    <v-card color="grey" class="pa-3" variant="outlined">
      <v-card-title> Sem Definição: {{ adherenceResponse!.unspecifiedPercentage }} </v-card-title>
    </v-card>
  </v-card-item>

  <v-card-item>
    <v-chip color="green" class="me-2 mb-2">
      Adote
    </v-chip>
    <v-chip color="red" class="me-2 mb-2">
      Evite
    </v-chip>
    <v-chip color="blue" class="me-2 mb-2">
      Experimente
    </v-chip>
    <v-chip color="yellow" class="me-2 mb-2">
      Avalie
    </v-chip>
    <v-chip color="grey" class="me-2 mb-2">
      Sem Definição
    </v-chip>
  </v-card-item>
</template>

<script lang="ts">
import { AdherenceResponse } from '../../entities/Dtos/adherenceResponse';

  export default {
    props: {
      adherenceResponse: AdherenceResponse
    }
  };
</script>
