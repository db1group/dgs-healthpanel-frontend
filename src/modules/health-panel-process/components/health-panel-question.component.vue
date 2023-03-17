<template>
  <v-row align="center" class="health-panel-question">
    <v-col>
      <p>{{ question.description }}</p>
    </v-col>
    <v-col>
      <v-select
        density="compact"
        v-model="question.value"
        :items="options"
        item-title="label"
        item-value="value"
        type="text"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import {
  HealthPanelColumnsQuestions,
  HealthPanelColumnsStatus,
} from '../domain/health-panel-columns';

interface Props {
  question: HealthPanelColumnsQuestions;
}

const options = [
  { value: HealthPanelColumnsStatus.DONE, label: 'Done' },
  { value: HealthPanelColumnsStatus.PENDING, label: 'Pending' },
];

const { question } = defineProps<Props>();
</script>

<style lang="sass">
.health-panel-question
  padding: 20px
</style>
