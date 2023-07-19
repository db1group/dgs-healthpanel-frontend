import { IPillarScores } from '../dto/health-analytics-backend.dto';
import {
  PillarAlertRanges,
  PillarsHealthRanges,
} from './pillars-health-ranges.enum';

export class PillarScores implements IPillarScores {
  name: string;
  score: number;

  constructor(data?: IPillarScores) {
    this.name = data?.name ?? '';
    this.score = data?.score ?? 0;
  }

  get getScoreInPercentage(): string {
    const healthyRanges: any = PillarsHealthRanges;
    const currentPillarName = this.name as any;
    const healtyRange = healthyRanges[currentPillarName];
    const percentage = Number((this.score / healtyRange) * 100).toFixed(0);
    return `${percentage}%`;
  }

  get isAlert(): boolean {
    const alertRanges: any = PillarAlertRanges;
    const currentPillarName = this.name as any;
    const healtyRange = alertRanges[currentPillarName];
    return this.score >= healtyRange;
  }

  get isHealthy(): boolean {
    const healthyRanges: any = PillarsHealthRanges;
    const currentPillarName = this.name as any;
    const healtyRange = healthyRanges[currentPillarName];
    return this.score >= healtyRange;
  }
}
