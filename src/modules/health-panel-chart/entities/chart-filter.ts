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
    let filterStartDate;
    let filterEndDate;

    if (startDate && endDate) {
      filterStartDate = `01/01/${startDate}`;
      filterEndDate = `12/31/${endDate}`;
    } else if (startDate) {
      filterStartDate = `01/01/${startDate}`;
      filterEndDate = `12/31/${startDate}`;
    } else {
      filterStartDate = filterEndDate = undefined;
    }
    return {
      startDate: filterStartDate ? filterStartDate : undefined,
      endDate: filterEndDate ? filterEndDate : undefined,
      costCenterIds: this.costCenter?.length ? this.costCenter : undefined,
    };
  }
}
