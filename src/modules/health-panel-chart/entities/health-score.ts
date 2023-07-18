export class HealthScore {
  constructor(public score: number) {
    this.score = score;
  }

  get isHealthy(): boolean {
    return this.score >= 80;
  }
}
