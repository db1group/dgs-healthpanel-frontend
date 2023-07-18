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
      (it: HealthScoreBackendDTO) => it.costCenterId === value.costCenterId,
    );
  }

  private getProjectGroupedData(
    data: HealthScoreBackendDTO[],
    months: string[],
  ) {
    const projects = data.reduce((acc: any[], value: HealthScoreBackendDTO) => {
      const hasData = acc.findIndex(
        (it: any) => it.costCenterId === value.costCenterId,
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
        console.log(projectDataSorted[hasData]);
        if (hasData >= 0) return projectDataSorted[hasData].healthScore;
        return undefined;
      });

      const skipped = (ctx: any, value: any) =>
        ctx.p0.skip || ctx.p1.skip ? value : undefined;

      acc.push({
        costCenterId: value.costCenterId,
        label: value.projectName,
        data: healthScore,
        borderWidth: 3,
        segment: {
          borderDash: (ctx: any) => skipped(ctx, [6, 6]),
          borderColor: (ctx: any) => skipped(ctx, 'rgb(255,255,255,0.1)'),
        },
        spanGaps: true,
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
