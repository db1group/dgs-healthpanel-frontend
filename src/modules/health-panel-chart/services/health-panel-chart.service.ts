import { HttpClient } from '../../../infra/http/http';
import { HealthAnalyticsBackendDto } from '../dto/health-analytics-backend.dto';
import { HealthScoreBackendDTO } from '../dto/health-score-backend.dto';
import { AnalyticsFilter } from '../entities/analytics-filter';
import { ChartFilter } from '../entities/chart-filter';
import { HealthPanelAnalytics } from '../entities/health-panel-analytics';

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

  getAnalyticsEvaluation(
    filter?: AnalyticsFilter,
  ): Promise<HealthPanelAnalytics[]> {
    const data = filter?.format();
    return this.http
      .get('/evaluation/analytics', {
        params: data,
      })
      .then(({ data }) => {
        const response: HealthAnalyticsBackendDto[] = data;
        return response.map((item) => new HealthPanelAnalytics(item));
      });
  }
}
