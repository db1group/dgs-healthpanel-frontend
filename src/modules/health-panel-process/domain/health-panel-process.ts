import { HealthPanelColumns } from './health-panel-columns';

export class HealthPanelProcess {
  public title: string;

  public order: number;

  public columns: HealthPanelColumns[];

  constructor(
    title: string,
    columns: HealthPanelColumns[] = [],
    order: number,
  ) {
    this.title = title;
    this.order = order;
    this.columns = columns
      .map(
        (it: any) => new HealthPanelColumns(it.title, it.questions, it.order),
      )
      .sort((a: HealthPanelColumns, b: HealthPanelColumns) => {
        return Number(a.title) > Number(b.title) ? 1 : -1;
      });
  }
}
