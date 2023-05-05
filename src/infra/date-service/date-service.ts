export const DATE_SERVICE = Symbol('DATE_SERVICE');

export interface DateService {
  format(date: Date, mask?: string): string;
  isAfter(date: Date, dateToCompare: Date): boolean;
}
