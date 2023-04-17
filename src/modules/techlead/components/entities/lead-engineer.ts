import { Project } from '../../../project/components/entities/project';

export class LeadEngineer {
  public id: string;

  public name: string;

  public inTraining: boolean;

  public projects: Project[];

  constructor(data: any = {}) {
    this.id = data.id;
    this.name = data.name;
    this.inTraining = data.inTraining === false;
    this.projects = data.projects;
  }
}
