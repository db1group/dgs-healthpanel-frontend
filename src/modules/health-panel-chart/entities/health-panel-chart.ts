import { ChartAdapter } from './chart-adapter';
import { ChartJSOutput } from './chartjs-adapter';

export class HealthPanelChart {
  public date: string;

  public healthScore: string;

  public metricsHealthScore: string;

  public processHealthScore: string;

  public projectId: string;

  constructor(data: any = {}) {
    this.date = data.date;
    this.healthScore = data.healthScore;
    this.metricsHealthScore = data.metricsHealthScore;
    this.processHealthScore = data.processHealthScore;
    this.projectId = data.projectId;
  }

  format(formatter: ChartAdapter<ChartJSOutput>) {
    return formatter.formatToChart(this);
  }
}
