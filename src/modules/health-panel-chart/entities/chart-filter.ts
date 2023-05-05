export class ChartFilter {
  public projectsIds: string[];

  public startDate?: Date;

  public endDate?: Date;

  constructor() {
    this.projectsIds = [];
  }
}
