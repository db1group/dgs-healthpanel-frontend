<template>
  <div class="health-panel-chart">
    <report-analytic-expanded-dialog
      v-model="showDialogAnalytic"
      :evaluationsAnalytics="evaluationsAnalytics"
    />
    <v-card>
      <v-card-title> Relatório analítico </v-card-title>
      <v-card-text>
        <v-row justify="end">
          <v-col cols="12" lg="3" class="text-right">
            <v-btn color="primary" @click="openDialog"
              >Relatório completo</v-btn
            >
          </v-col>
          <v-col cols="12">
            <v-radio-group
              v-model="selectedMonth"
              inline
              @change="filterByMonth"
            >
              <v-radio
                class="ml-2"
                color="primary"
                v-for="(item, index) in months"
                :key="index"
                :label="item"
                :value="index"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="evaluation in evaluationsAnalytics" cols="12">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-title>
                  {{ evaluation.costCenterName }}
                  <v-spacer></v-spacer>

                  <v-chip :color="evaluation.isHealthy ? 'success' : 'danger'">
                    {{ evaluation.healthStatusDescription }}
                  </v-chip>
                </v-expansion-panel-title>

                <v-expansion-panel-text elevation="0">
                  <v-row>
                    <v-col cols="12" lg="3">
                      <default-card
                        title="Nota em processos"
                        :value="evaluation.processHealthScore.score"
                      />
                    </v-col>
                    <v-col cols="12" lg="3">
                      <default-card
                        title="Nota em métricas"
                        :value="evaluation.metricsHealthScore.score"
                      />
                    </v-col>
                    <v-col cols="12" lg="3">
                      <default-card
                        title="HealthScore"
                        :value="evaluation.healthScore.score"
                      />
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
  import { HealthPanelAnalytics } from '../../entities/health-panel-analytics';
  import DefaultCard from '../../../../components/default-card/default-card.component.vue';
  import ReportAnalyticExpandedDialog from './report-analytic-expanded.dialog.vue';

  export default {
    components: {
      DefaultCard,
      ReportAnalyticExpandedDialog,
    },
    props: {
      evaluationsAnalytics: {
        type: Array as () => HealthPanelAnalytics[],
        required: true,
        default: () => [],
      },
    },
    data() {
      return {
        showDialogAnalytic: false,
        selectedMonth: new Date().getMonth(),
        months: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ],
      };
    },
    methods: {
      openDialog() {
        this.showDialogAnalytic = true;
      },
      filterByMonth() {
        this.$emit('filter-by-month', this.selectedMonth);
      },
    },
    created() {
      this.filterByMonth();
    },
  };
</script>
