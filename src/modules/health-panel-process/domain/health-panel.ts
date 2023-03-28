import { HealthPanelProcess } from './health-panel-process';

export class HealthPanel {
  public process: HealthPanelProcess[];

  public project: string;

  constructor(data: any = []) {
    this.project = '';
    this.process = data.map(
      (it: any) => new HealthPanelProcess(it.title, it.columns),
    );
  }
}
