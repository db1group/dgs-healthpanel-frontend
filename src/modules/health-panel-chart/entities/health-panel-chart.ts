import { ChartAdapter } from './chart-adapter';
import { ChartJSOutput } from './chartjs-adapter';

export class HealthPanelChart {
  public date: string;

  public healthScore: number[];

  public projectId: string;

  public projectName: string;

  constructor(data: any = {}) {
    this.date = data.date;
    this.healthScore = data.healthScore;
    this.projectId = data.projectId;
    this.projectName = data.projectName;
  }
}
