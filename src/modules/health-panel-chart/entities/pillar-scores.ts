import { IPillarScores } from '../dto/health-analytics-backend.dto';

export class PillarScores implements IPillarScores {
  name: string;
  score: number;

  constructor(data?: IPillarScores) {
    this.name = data?.name ?? '';
    this.score = data?.score ?? 0;
  }

  get isHealthy(): boolean {
    const healthyRanges: any = {
      'Gestão de testes': 30,
      'Gestão de Build & Release': 20,
      'Monitoramento de Aplicações': 10,
      'Qualidade do Código': 5,
      'Infraestrutura como Código': 30,
    };
    const currentPillarName = this.name as any;
    const healtyRange = healthyRanges[currentPillarName];
    return this.score >= healtyRange;
  }
}
