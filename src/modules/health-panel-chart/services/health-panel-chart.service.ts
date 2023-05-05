import { HttpClient } from '../../../infra/http/http';
import { HealthPanelChart } from '../entities/health-panel-chart';

export class HealthPanelChartService {
  constructor(private readonly http: HttpClient) {}

  getDataSet(): Promise<HealthScoreBackendDTO[]> {
    return this.http.get('/evaluation').then(({ data }) => {
      const response: HealthScoreBackendDTO[] = data;
      return response;
    });
  }
}

export type HealthScoreBackendDTO = {
  date: string;

  healthScore: string;

  metricsHealthScore: string;

  processHealthScore: string;

  projectId: string;

  projectName: string;
};
