export class HealthPanelColumns {
  title: string;

  questions: HealthPanelColumnsQuestions[];

  order: number;

  constructor(
    title: string,
    questions: HealthPanelColumnsQuestions[] = [],
    order: number,
  ) {
    this.title = title;
    this.questions = questions;
    this.order = order;
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
