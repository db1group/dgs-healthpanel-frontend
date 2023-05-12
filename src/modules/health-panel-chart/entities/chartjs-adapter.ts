import { cs } from 'date-fns/locale';
import { DateService } from '../../../infra/date-service/date-service';
import { ChartAdapter } from './chart-adapter';
import { HealthScoreBackendDTO } from '../dto/health-score-backend.dto';

export class ChartjsAdapter implements ChartAdapter<ChartJSOutput> {
  constructor(private readonly dateService: DateService) {}

  private sortData(data: HealthScoreBackendDTO[]) {
    return data.sort((a: HealthScoreBackendDTO, b: HealthScoreBackendDTO) =>
      this.dateService.isAfter(new Date(a.date), new Date(b.date)) ? 1 : -1,
    );
  }

  private groupProjects(
    data: HealthScoreBackendDTO[],
    value: HealthScoreBackendDTO,
  ) {
    return data.filter(
      (it: HealthScoreBackendDTO) => it.projectId === value.projectId,
    );
  }

  private getProjectGroupedData(
    data: HealthScoreBackendDTO[],
    months: string[],
  ) {
    const projects = data.reduce((acc: any[], value: HealthScoreBackendDTO) => {
      const hasData = acc.findIndex(
        (it: any) => it.projectId === value.projectId,
      );

      if (hasData >= 0) return acc;

      const projectData = this.groupProjects(data, value);
      const projectDataSorted = this.sortData(projectData);

      const healthScore = months.map((date: string) => {
        const hasData = projectDataSorted.findIndex(
          (it: HealthScoreBackendDTO) => {
            return (
              this.dateService.format(new Date(it.date), 'MMM - yyyy') === date
            );
          },
        );
        if (hasData >= 0) return projectDataSorted[hasData].healthScore;
        return undefined;
      });

      acc.push({
        projectId: value.projectId,
        label: value.projectName,
        data: healthScore,
        borderWidth: 1,
      });
      return acc;
    }, []);
    return projects;
  }

  formatToChart(data: HealthScoreBackendDTO[], dates: string[]): ChartJSOutput {
    const projectsData = this.getProjectGroupedData(data, dates);
    return {
      labels: dates,
      dataset: projectsData,
    };
  }
}

export type ChartJSOutput = {
  dataset: {
    label: string;
    data: number[];
    borderWidth: number;
  }[];
  labels: string[];
};
