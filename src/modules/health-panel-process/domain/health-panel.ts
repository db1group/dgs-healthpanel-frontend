import { HealthPanelProcess } from './health-panel-process';

export class HealthPanel {
  public process: HealthPanelProcess[];

  constructor(data: any = []) {
    this.process = data.map(
      (it: any) => new HealthPanelProcess(it.title, it.columns),
    );
  }
}
