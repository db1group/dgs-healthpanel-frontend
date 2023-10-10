export class AdherenceResponse {
  adoptPercentage: string;
  avoidPercentage: string;
  assessPercentage: string;
  experimentPercentage: string;
  unspecifiedPercentage: string;

  constructor(data:any = {}) {
    this.adoptPercentage = data.adoptPercentage;
    this.avoidPercentage = data.avoidPercentage;
    this.assessPercentage = data.assessPercentage;
    this.experimentPercentage = data.experimentPercentage;
    this.unspecifiedPercentage = data.unspecifiedPercentage;
}
}
