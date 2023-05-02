import { ChartAdapter } from './chart-adapter';
import { HealthPanelChart } from './health-panel-chart';

export class ChartjsAdapter implements ChartAdapter<ChartJSOutput> {
  formatToChart(data: HealthPanelChart): ChartJSOutput {
    return {
      label: data.name,
      borderWidth: 1,
      data: [],
    };
  }
}

export type ChartJSOutput = {
  label: string;
  data: number[];
  borderWidth: number;
};
