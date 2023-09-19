<template>
  <v-row justify="center">
    <v-dialog
      persistent
      :model-value="modelValue"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Relatório analítico </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="2">
              <p class="pa-3 text-center" :style="{ background: projectColor }">
                Projetos
              </p>
            </v-col>
        
            <v-col cols="7">
              <p class="pa-3 text-center" :style="{ background: pillarsScore }">
                Pilares
              </p>
            </v-col>
          </v-row>
          <v-row v-for="stack in stacks">
            <v-col cols="2">
              <v-card-title class="text-center">
                {{ stack.stackName }}
              </v-card-title>
            </v-col>
            <v-col cols="7">
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
  import { Stack } from '../../entities/stack';
  import DefaultCard from '../../../../components/default-card/default-card.component.vue';
  import { ColumnColorsEnum } from './config/column-colors.enum';

  export default {
    components: {
      DefaultCard,
    },
    props: {
      modelValue: {
        type: Boolean,
        required: true,
      },
      stacks: {
        type: Array as () => Stack[],
        required: true,
        default: () => [],
      },
    },

    methods: {
      close() {
        this.$emit('update:modelValue', false);
      },
    },
    computed: {
      stack() {
        return this.stacks.map((stacks) => ({
          stackName: stacks.stackName,
          stackId: stacks.stackId
        }));
      },
      projectColor() {
        return ColumnColorsEnum.PROJECTS;
      },
      healthScoresColor() {
        return ColumnColorsEnum.STACKPANEL;
      },
      pillarsScore() {
        return ColumnColorsEnum.PILLARS;
      },
    },
  };
</script>
