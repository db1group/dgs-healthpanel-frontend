import * as DateFNS from 'date-fns';
import { DateService } from './date-service';

export class DateFnsAdapter implements DateService {
  format(date: Date, mask: string = 'DD/MM/yyyy'): string {
    return DateFNS.format(date, mask);
  }

  isAfter(date: Date, dateToCompare: Date): boolean {
    return DateFNS.isAfter(date, dateToCompare);
  }
}
