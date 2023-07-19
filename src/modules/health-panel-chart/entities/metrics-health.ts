export class MetricsHealth {
  constructor(public score: number) {
    this.score = score;
  }

  get isHealthy() {
    return this.score >= 80;
  }

  get isAlert() {
    return this.score >= 60 && this.score < 80;
  }
}
