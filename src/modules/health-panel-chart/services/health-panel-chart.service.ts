import { HttpClient } from '../../../infra/http/http';
import { HealthScoreBackendDTO } from '../dto/health-score-backend.dto';
import { ChartFilter } from '../entities/chart-filter';

export class HealthPanelChartService {
  constructor(private readonly http: HttpClient) {}

  getDataSet(filter?: ChartFilter): Promise<HealthScoreBackendDTO[]> {
    const data = filter?.format();
    return this.http
      .get('/evaluation', {
        params: data,
      })
      .then(({ data }) => {
        const response: HealthScoreBackendDTO[] = data;
        return response;
      });
  }
}
