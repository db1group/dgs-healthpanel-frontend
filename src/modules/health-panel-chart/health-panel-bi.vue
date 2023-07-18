<template>
  <v-card>
    <v-card-title> Resultados </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" lg="3" v-if="showSidebar">
          <v-expansion-panels :max="500">
            <v-expansion-panel title="Data">
              <v-expansion-panel-text
                style="max-height: 500px"
                class="overflow-auto"
              >
                <v-checkbox
                  density="compact"
                  v-for="date in years"
                  :key="date"
                  v-model="chartFilter.years"
                  hide-details
                  :label="date"
                  :value="date"
                ></v-checkbox>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel title="Centro de custos">
              <v-expansion-panel-text
                style="max-height: 500px"
                class="overflow-auto"
              >
                <v-checkbox
                  density="compact"
                  v-for="costCenter in costCenters"
                  :key="costCenter.id"
                  v-model="chartFilter.costCenter"
                  hide-details
                  :label="costCenter.name"
                  :value="costCenter.id"
                ></v-checkbox>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-row>
            <v-col>
              <v-btn @click="getData" block color="primary">
                Aplicar filtros
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" :lg="showSidebar ? 9 : 12" v-if="chartDataSet.labels.length">
          <v-tabs v-model="tab" fixed-tabs color="primary">
            <v-tab
              color="primary"
              v-for="(item, index) in tabs"
              :value="item.value"
            >
              {{ item.name }}</v-tab
            >
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item
              v-for="item in tabs"
              class="health-panel-process__theme"
              :key="item.value"
              :value="item.value"
            >
              <v-row>
                <v-col cols="11">
                  <component
                    :chart-data-set="chartDataSet"
                    :dates="dates"
                    :evaluations-analytics="evaluationsAnalytics"
                    :is="item.component"
                    @filter-by-month="getEvaluationsAnalytics"
                  />
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import { ChartFilter } from './entities/chart-filter';
  import { Project } from '../project/entities/project';

  import ChartHealthPanel from './components/chart/chart-health-panel.component.vue';
  import ReportAnalyticComponent from './components/analytics/report-analytic.component.vue';
  import { markRaw, inject } from 'vue';
  import { ProjectService } from '../project/services/project.service';

  import { HTTP_CLIENT, HttpClient } from '../../infra/http/http';
  import {
    DATE_SERVICE,
    DateService,
  } from '../../infra/date-service/date-service';
  import { HealthPanelChartService } from './services/health-panel-chart.service';
  import { ChartjsAdapter } from './entities/chartjs-adapter';
  import { HealthScoreBackendDTO } from './dto/health-score-backend.dto';
  import { HealthPanelAnalytics } from './entities/health-panel-analytics';
  import { AnalyticsFilter } from './entities/analytics-filter';

  export default {
    data: () => ({
      projects: [] as Project[],
      evaluationsAnalytics: [] as HealthPanelAnalytics[],
      chartFilter: new ChartFilter(),
      projectService: new ProjectService(inject(HTTP_CLIENT) as HttpClient),
      healthPanelChartService: new HealthPanelChartService(
        inject(HTTP_CLIENT) as HttpClient,
      ),
      chartDataSet: { labels: [] } as any,
      dates: [] as string[],
      years: ['2022', '2023'],
      costCenters: [] as { id: string; name: string }[],
      dateService: inject(DATE_SERVICE) as DateService,
      tabs: [
        {
          name: 'Relatório geral',
          value: 0,
          component: markRaw(ChartHealthPanel),
        },
        {
          name: 'Relatório analítico',
          value: 1,
          component: markRaw(ReportAnalyticComponent),
        },
      ],
      tab: 0,
    }),
    methods: {
      async getAllProjects() {
        this.projects = await this.projectService.getAllProjects();
      },

      getDates(data: HealthScoreBackendDTO[] = []) {
        return data
          .reduce((acc: any[], value: HealthScoreBackendDTO) => {
            const hasData = acc.findIndex(
              (it: any) =>
                this.dateService.format(new Date(it), 'MMM - yyyy') ===
                this.dateService.format(new Date(value.date), 'MMM - yyyy'),
            );
            if (hasData >= 0) return acc;
            acc.push(value.date);
            return acc;
          }, [])
          .sort((a: string, b: string) =>
            this.dateService.isAfter(new Date(a), new Date(b)) ? 1 : -1,
          )
          .map((it: string) =>
            this.dateService.format(new Date(it), 'MMM - yyyy'),
          );
      },

      async getCostCenters() {
        this.costCenters = await this.projectService.getAllCenterOfCosts();
      },
      async getEvaluationsAnalytics(
        currentMonth: number = new Date().getMonth(),
      ) {
        const analyticsFilter = new AnalyticsFilter(currentMonth, this.dateService);
        this.evaluationsAnalytics =
          await this.healthPanelChartService.getAnalyticsEvaluation(
            analyticsFilter,
          );
      },
      getData() {
        this.getDataSet();
      },
      async getDataSet() {
        const data = await this.healthPanelChartService.getDataSet(
          this.chartFilter as ChartFilter,
        );
        this.chartDataSet = { labels: [] };
        this.$nextTick(() => {
          this.dates = this.getDates(data);

          this.chartDataSet = new ChartjsAdapter(
            this.dateService,
          ).formatToChart(data, this.dates);
        });
      },
      async getEvaluations() {
        return Promise.all([
          this.getCostCenters(),
          this.getAllProjects(),
          this.getData(),
        ]);
      },
    },
    computed: {
      showSidebar() {
        return this.tab === 0;
      },
    },

    async created() {
      this.$loader.open();
      this.getEvaluations().finally(() => {
        this.$loader.close();
      });
    },
  };
</script>
