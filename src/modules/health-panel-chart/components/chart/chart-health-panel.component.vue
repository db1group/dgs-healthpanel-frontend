<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <div class="chart-container">
            <canvas ref="myChart" />
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import { Chart } from 'chart.js';

  import { Project } from '../../../project/entities/project';
  import { ChartFilter } from '../../entities/chart-filter';

  export default {
    props: {
      filter: {
        type: Object,
        default: () => new ChartFilter(),
      },
      dates: {
        type: Array,
        default: () => [],
      },
      chartDataSet: {
        type: Object,
        default: () => {},
      },
    },
    data: () => ({
      projects: [] as Project[],
    }),
    async mounted() {
      this.startChart();
    },
    methods: {
      startChart() {
        const chartElement = this.$refs['myChart'] as HTMLCanvasElement;

        const ctx = chartElement.getContext('2d') as CanvasRenderingContext2D;

        const data = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.chartDataSet.labels,
            datasets: this.chartDataSet.dataset,
          },
          options: {
            interaction: {
              intersect: false,
            },
            plugins: {
              title: {
                display: true,
              },
              tooltip: {
                usePointStyle: true,
                enabled: true,
                mode: 'x',
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        data.draw();
      },
    },
  };
</script>
<style lang="sass">
  .chart-container
    position: relative
    height: 65vh
    width: 100%
</style>
