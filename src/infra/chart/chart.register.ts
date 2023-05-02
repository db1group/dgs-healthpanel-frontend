import { Chart, registerables } from 'chart.js';
export class ChartRegister {
  static register() {
    Chart.register(...registerables);
  }
}
