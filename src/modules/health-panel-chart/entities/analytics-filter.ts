import { DateService } from '../../../infra/date-service/date-service';
import { BackendEvaluationFilter, EvaluationFilter } from './filter';

export class AnalyticsFilter implements EvaluationFilter {
  constructor(
    private month: number = new Date().getMonth(),
    private readonly dateService: DateService,
  ) {
    this.month = month + 1;
  }

  getCurrentYear() {
    return new Date().getFullYear();
  }

  format(): BackendEvaluationFilter {
    const startDate = new Date(this.getCurrentYear(), this.month - 1, 1);
    const lastDayOfMonth = new Date(
      this.getCurrentYear(),
      this.month,
      0,
    ).getDate();
    const endDate = new Date(this.getCurrentYear(), this.month - 1, lastDayOfMonth);

    return {
      startDate: this.dateService.format(startDate, 'MM/dd/yyyy'),
      endDate: this.dateService.format(endDate, 'MM/dd/yyyy'),
    };
  }
}
