import { HealthScoreBackendDTO } from '../dto/health-score-backend.dto';

export interface ChartAdapter<T> {
  formatToChart(data: HealthScoreBackendDTO[], dates: string[]): T;
}
