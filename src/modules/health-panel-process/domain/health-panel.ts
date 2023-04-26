import { HealthPanelProcess } from './health-panel-process';

export class HealthPanel {
  public process: HealthPanelProcess[];

  public project: string;

  constructor(data: any = [], project: string = '') {
    this.project = project;
    this.process = data.map((it: any) => new HealthPanelProcess(it));
  }

  format() {
    return {
      project: this.project,
      isRetroactive: false,
      quantityDevs: 3,
      pillars: this.process.map((it) => ({
        id: it.id,
        additionalData: it.additionalData,
      })),
      questions: this.process.reduce(
        (acc: any[], process: HealthPanelProcess) => {
          process.columns.forEach((column) => {
            column.questions.forEach((question) => {
              acc.push({ QuestionId: question.id, value: question.value });
            });
          });
          return acc;
        },
        [],
      ),
    };
  }
}
