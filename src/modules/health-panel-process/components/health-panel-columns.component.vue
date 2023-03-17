<template>
  <div class="health-panel-columns">
    <p class="health-panel-columns__column-title">
      {{ props.column.title }}
    </p>
    <health-panel-question-component
      v-for="question in props.column.questions"
      :question="question"
    />
  </div>
</template>

<script setup lang="ts">
import { HealthPanelColumns } from '../domain/health-panel-columns';
import HealthPanelQuestionComponent from './health-panel-question.component.vue';

interface Props {
  column: HealthPanelColumns;
}

const props = defineProps<Props>();
</script>

<style lang="sass">
.health-panel-columns
    min-height: 30vh
    height: auto
    width: calc(100% / 5)
    border: 0.5px solid #3b3b3b
    display: flex
    flex-direction: column
    justify-content: space-between
    &__column-title
        text-align: center
        backdrop-filter: brightness(0.8)
        padding: 10px
        font-size: 18px
</style>
