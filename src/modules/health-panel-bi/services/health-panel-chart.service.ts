import { HttpClient } from '../../../infra/http/http';
import { HealthPanelChart } from '../entities/health-panel-chart';

export class HealthPanelChartService {
  constructor(private readonly http: HttpClient) {}

  getDataSet(): Promise<HealthPanelChart[]> {
    return this.http.get('/evaluation').then(({ data }) => {
      const response: any[] = data;
      return response.map((item) => new HealthPanelChart(item));
    });
  }
}
