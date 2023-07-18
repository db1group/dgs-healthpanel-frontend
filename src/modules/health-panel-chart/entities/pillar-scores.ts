import { IPillarScores } from '../dto/health-analytics-backend.dto';

export class PillarScores implements IPillarScores {
  name: string;
  score: number;

  constructor(data?: IPillarScores) {
    this.name = data?.name ?? '';
    this.score = data?.score ?? 0;
  }

  get isHealthy(): boolean {
    return this.score >= 80;
  }
}
