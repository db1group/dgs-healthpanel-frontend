import { DateService } from '../../../infra/date-service/date-service';
import { HealthScoreBackendDTO } from '../services/health-panel-chart.service';
import { ChartAdapter } from './chart-adapter';
import { HealthPanelChart } from './health-panel-chart';

export class ChartjsAdapter {
  // export class ChartjsAdapter implements ChartAdapter<ChartJSOutput> {
  constructor(private readonly dateService: DateService) {}

  // formatToChart(data: HealthScoreBackendDTO[]): ChartJSOutput {
  formatToChart(data: HealthScoreBackendDTO[]) {
    const result = data.reduce((acc: any, value: HealthScoreBackendDTO) => {
      const hasData = acc.findIndex((it: any) => it.label === value.projectId);
      if (hasData >= 0) return acc;
      const projectData = data.filter(
        (it: HealthScoreBackendDTO) => it.projectId === value.projectId,
      );

      const projectDataSorted = projectData.sort(
        (a: HealthScoreBackendDTO, b: HealthScoreBackendDTO) =>
          this.dateService.isAfter(new Date(a.date), new Date(b.date)) ? 1 : -1,
      );

      const values = projectDataSorted.map(
        (it: HealthScoreBackendDTO) => it.healthScore,
      );

      acc.push({
        label: value.projectName,
        data: values,
        borderWidth: 1,
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
      });
      return acc;
    }, []);
    return result;
  }
}

export type ChartJSOutput = {
  label: string;
  data: number[];
  borderWidth: number;
};
