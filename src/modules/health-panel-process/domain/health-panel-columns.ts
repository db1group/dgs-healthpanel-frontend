export class HealthPanelColumns {
  id: string;

  title: string;

  questions: HealthPanelColumnsQuestions[];

  order: number;

  constructor(data: any = {}) {
    this.id = data.id;
    this.title = data.title;
    this.questions = data.questions;
    this.order = data.order;
  }
}

export interface HealthPanelColumnsQuestions {
  id: string;
  description: string;
  value: HealthPanelColumnsStatus;
}

export enum HealthPanelColumnsStatus {
  PENDING = 'PENDING',
  DONE = 'DONE',
}
