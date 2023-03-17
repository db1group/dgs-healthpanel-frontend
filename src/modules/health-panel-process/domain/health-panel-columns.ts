export class HealthPanelColumns {
  title: string;

  questions: HealthPanelColumnsQuestions[];

  constructor(title: string, questions: HealthPanelColumnsQuestions[] = []) {
    this.title = title;
    this.questions = questions;
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
