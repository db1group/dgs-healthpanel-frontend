import {
  HealthAnalyticsBackendDto,
  IPillarScores,
} from '../dto/health-analytics-backend.dto';
import { HealthScore } from './health-score';
import { MetricsHealth } from './metrics-health';
import { PillarScores } from './pillar-scores';
import { ProcessHealth } from './process-health';

export class HealthPanelAnalytics {
  projectName: string;
  costCenterName: string;
  processHealthScore: ProcessHealth;
  metricsHealthScore: MetricsHealth;
  date: string;
  user: string;
  pillarScores: Array<IPillarScores>;
  healthScore: HealthScore;

  constructor(data?: HealthAnalyticsBackendDto) {
    this.projectName = data?.projectName ?? '';
    this.costCenterName = data?.costCenterName ?? '';
    this.processHealthScore = new ProcessHealth(data?.processHealthScore ?? 0);
    this.metricsHealthScore = new MetricsHealth(data?.metricsHealthScore ?? 0);
    this.date = data?.date ?? '';
    this.user = data?.user ?? '';
    this.pillarScores = data?.pillarScores?.length
      ? data.pillarScores
          .map((pillarScore) => new PillarScores(pillarScore))
          .sort((a, b) => (a.name >= b.name ? 1 : -1))
      : [];
    this.healthScore = new HealthScore(data?.healthScore ?? 0);
  }

  get isHealthy(): boolean {
    return this.healthScore.isHealthy;
  }

  get isAlert(): boolean {
    return this.healthScore.isAlert;
  }

  get healthStatusDescription(): string {
    return this.isHealthy ? 'Passed' : 'Failed';
  }
}
