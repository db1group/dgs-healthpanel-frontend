import { HealthPanelColumns } from './health-panel-columns';

export class HealthPanelProcess {
  public title: string;

  public columns: HealthPanelColumns[];

  constructor(title: string, columns: HealthPanelColumns[] = []) {
    this.title = title;
    this.columns = columns.map(
      (it: any) => new HealthPanelColumns(it.title, it.questions),
    );
  }
}
