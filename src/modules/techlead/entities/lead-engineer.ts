export class LeadEngineer {
  public id: string;

  public name: string;

  public inTraining: boolean;

  public projects: string[];

  constructor(data: any = {}) {
    this.id = data.id;
    this.name = data.name;
    this.inTraining = data.inTraining === false;
    this.projects = this.getProjectsId(data.leadProjects || []);
  }

  private getProjectsId(projects: { projectId: string }[] = []) {
    return projects.map((project) => project.projectId);
  }

  format() {
    return {
      id: this.id,
      name: this.name,
      inTraining: this.inTraining,
      leadProjects: this.projects.length
        ? this.projects.map((project) => {
            return {
              projectId: project,
            };
          })
        : undefined,
    };
  }
}
