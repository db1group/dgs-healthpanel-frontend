import { HealthPanelChart } from './health-panel-chart';

export interface ChartAdapter<T> {
  formatToChart(data: HealthPanelChart): T;
}
