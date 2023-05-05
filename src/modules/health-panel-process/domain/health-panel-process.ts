import { HealthPanelColumns } from './health-panel-columns';

export class HealthPanelProcess {
  public id: string;

  public title: string;

  public order: number;

  public additionalData: string;

  public columns: HealthPanelColumns[];

  constructor(data: any = {}) {
    this.id = data.id;
    this.title = data.title;
    this.additionalData = data.additionalData;
    this.order = data.order;
    this.columns = data.columns
      .map((it: any) => new HealthPanelColumns(it))
      .sort((a: HealthPanelColumns, b: HealthPanelColumns) => {
        return Number(a.title) > Number(b.title) ? 1 : -1;
      });
  }
}
