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
            <v-col cols="3">
              <p
                class="pa-3 text-center"
                :style="{ background: healthScoresColor }"
              >
                HealthScores
              </p>
            </v-col>
            <v-col cols="7">
              <p class="pa-3 text-center" :style="{ background: pillarsScore }">
                Pilares
              </p>
            </v-col>
          </v-row>
          <v-row v-for="item in evaluations">
            <v-col cols="2">
              <v-card-title class="text-center">{{
                item.projectName
              }}</v-card-title>
            </v-col>
            <v-col cols="3">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-row no-gutters>
                    <v-col>
                      <default-card
                        :background-color="
                          item.metricsHealthScore.isHealthy
                            ? 'success'
                            : 'danger'
                        "
                        text-center
                        title="Métricas"
                        :value="item.metricsHealthScore.score"
                      />
                    </v-col>
                    <v-col>
                      <default-card
                        :background-color="
                          item.processHealthScore.isHealthy
                            ? 'success'
                            : 'danger'
                        "
                        text-center
                        title="Processos"
                        :value="item.processHealthScore.score"
                      />
                    </v-col>
                    <v-col>
                      <default-card
                        :background-color="
                          item.healthScore.isHealthy ? 'success' : 'danger'
                        "
                        text-center
                        title="HealthScore"
                        :value="item.healthScore.score"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="7">
              <v-col cols="12">
                <v-row justify="space-between" v-if="item.pillars.length">
                  <v-col cols="2" v-for="pillar in item.pillars">
                    <default-card
                      :background-color="
                        pillar.isHealthy ? 'success' : 'danger'
                      "
                      text-center
                      :title="pillar.name"
                      :value="pillar.score"
                    />
                  </v-col>
                </v-row>
                <v-row v-else>
                  <default-card value="--" />
                </v-row>
              </v-col>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
  import { HealthPanelAnalytics } from '../../entities/health-panel-analytics';
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
      evaluationsAnalytics: {
        type: Array as () => HealthPanelAnalytics[],
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
      evaluations() {
        return this.evaluationsAnalytics.map((evaluation) => ({
          projectName: evaluation.projectName,
          costCenterName: evaluation.costCenterName,
          processHealthScore: evaluation.processHealthScore,
          metricsHealthScore: evaluation.metricsHealthScore,
          healthScore: evaluation.healthScore,
          pillars: evaluation.pillarScores,
        }));
      },
      projectColor() {
        return ColumnColorsEnum.PROJECTS;
      },
      healthScoresColor() {
        return ColumnColorsEnum.HEALTHPANEL;
      },
      pillarsScore() {
        return ColumnColorsEnum.PILLARS;
      },
    },
  };
</script>
