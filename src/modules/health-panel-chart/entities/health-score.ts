export class HealthScore {
  constructor(public score: number) {
    this.score = score;
  }

  get isHealthy(): boolean {
    return this.score >= 80;
  }

  get isAlert(): boolean {
    return this.score >= 60 && this.score < 80;
  }
}
