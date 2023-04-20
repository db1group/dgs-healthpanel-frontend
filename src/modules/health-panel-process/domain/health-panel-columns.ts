export class HealthPanelColumns {
  title: string;

  questions: HealthPanelColumnsQuestions[];

  order: number;

  additionalData: string;

  constructor(
    title: string,
    questions: HealthPanelColumnsQuestions[] = [],
    order: number,
    additionalData: string,
  ) {
    this.title = title;
    this.questions = questions;
    this.order = order;
    this.additionalData = additionalData;
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
