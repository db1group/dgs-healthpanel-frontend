<template>
  <v-card>
    <v-card-title> Resultados </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" lg="2">
          <ul>
            <li>Projetos</li>
            <li>Projetos</li>
            <li>Projetos</li>
            <li>Projetos</li>
          </ul>
        </v-col>
        <v-col cols="12" lg="10">
          <div style="max-width: 80vw">
            <canvas ref="myChart"></canvas>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Chart } from 'chart.js';
import { HealthPanelChartService } from './services/health-panel-chart.service';
import { inject } from 'vue';
import { HTTP_CLIENT, HttpClient } from '../../infra/http/http';
import { HealthPanelChart } from './entities/health-panel-chart';
import { ChartjsAdapter } from './entities/chartjs-adapter';

export default {
  name: 'MyChart',
  data: () => ({
    projects: [] as HealthPanelChart[],
  }),
  methods: {
    async getDataSet() {
      const healthPanelChartService = new HealthPanelChartService(
        inject(HTTP_CLIENT) as HttpClient,
      );
      const data = await healthPanelChartService.getDataSet();
      console.log(data);
    },

    startChart() {
      const chartJSFormatter = new ChartjsAdapter();
      const chartElement = this.$refs['myChart'] as any;
      const ctx = chartElement.getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [
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
          // datasets: this.projects.map((it: HealthPanelChart) => it.format(chartJSFormatter))
          datasets: [
            {
              label: 'AL5 Bank',
              data: [84, 85, 88, 89],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 3,
            },
            {
              label: 'Avenue',
              data: [75, 78, 88.65, 90],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 3,
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
            },
            tooltip: {
              usePointStyle: true,
              enabled: true,
              mode: 'dataset',
            },
          },
          responsive: true,

          scales: {
            y: {
              // the data minimum used for determining the ticks is Math.min(dataMin, suggestedMin)
              suggestedMin: 30,

              // the data maximum used for determining the ticks is Math.max(dataMax, suggestedMax)
              suggestedMax: 100,
            },
          },
        },
      });
    },
  },
  mounted() {
    this.startChart();
    this.getDataSet();
  },
};
</script>
