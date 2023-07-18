export class ProcessHealth {
  constructor(public score: number) {
    this.score = score;
  }

  get isHealthy() {
    return this.score >= 80;
  }
}
