export class MetricsHealth {
  constructor(public score: number) {
    this.score = score;
  }

  get isHealthy() {
    return this.score >= 80;
  }
}
