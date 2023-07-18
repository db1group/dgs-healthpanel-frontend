import { BackendEvaluationFilter, EvaluationFilter } from './filter';

export class ChartFilter implements EvaluationFilter {
  public costCenter?: string[];

  public years: string[];

  constructor() {
    this.costCenter = [];
    this.years = [];
  }

  private sortYearsDate() {
    return this.years.sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);

      return dateA.getTime() - dateB.getTime();
    });
  }

  private getFirstYear() {
    const years = this.sortYearsDate();
    return years[0];
  }

  private getLastYear() {
    const years = this.sortYearsDate();
    if (years.length > 1) {
      return years[years.length - 1];
    }
  }

  format(): BackendEvaluationFilter {
    const startDate = this.getFirstYear();
    const endDate = this.getLastYear();

    return {
      startDate: startDate ? `01/01/${startDate}` : undefined,
      endDate: endDate ? `01/01/${endDate}` : undefined,
      costCenterIds: this.costCenter?.length ? this.costCenter : undefined,
    };
  }
}
