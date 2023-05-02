import { ChartAdapter } from './chart-adapter';
import { ChartJSOutput } from './chartjs-adapter';

export class HealthPanelChart {
  public name: string; // falta buscar o dado do banco

  public projectId: string;

  public processHealthScore: string;

  public metricsHealthScore: string;

  public date: string;

  public healthScore: string;

  constructor(data: any = {}) {
    this.projectId = data.projectId;
    this.name = data.name;
    this.processHealthScore = data.processHealthScore;
    this.metricsHealthScore = data.metricsHealthScore;
    this.date = data.date;
    this.healthScore = data.healthScore;
  }

  format(formatter: ChartAdapter<ChartJSOutput>) {
    return formatter.formatToChart(this);
  }
}
