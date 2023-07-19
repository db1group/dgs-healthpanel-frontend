export type HealthAnalyticsBackendDto = {
  projectName?: string;
  costCenterName?: string;
  processHealthScore?: number;
  metricsHealthScore?: number;
  date?: string;
  user?: string;
  pillarScores?: Array<IPillarScores>;
  healthScore?: number;
};

export type IPillarScores = {
  name: string;
  score: number;
  isHealthy: boolean;
  isAlert: boolean;
  getScoreInPercentage: string;
};
