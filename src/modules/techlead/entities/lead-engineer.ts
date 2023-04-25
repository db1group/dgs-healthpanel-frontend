import { Project } from '../../project/entities/project';

export class LeadEngineer {
  public id: string;

  public name: string;

  public inTraining: boolean;

  public projects: Project[];

  constructor(data: any = {}) {
    this.id = data.id;
    this.name = data.name;
    this.inTraining = data.inTraining === false;
    this.projects = data.projects || [];
  }

  format() {
    return {
      id: this.id,
      name: this.name,
      inTraining: this.inTraining,
      projects: this.projects.length
        ? this.projects.map((project) => project.id)
        : [],
    };
  }
}
