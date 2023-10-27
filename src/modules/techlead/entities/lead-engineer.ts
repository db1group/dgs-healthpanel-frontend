export class LeadEngineer {
  public id: string;

  public name: string;

  public email: string;

  public inTraining: boolean;

  public projects: string[];

  constructor(data: any = {}) {
    this.id = data.id || data.leadId;
    this.name = data.name || data.leadName;
    this.email = data.email;
    this.inTraining = data.inTraining === true;
    this.projects = data.leadProjects?.length
      ? this.getProjectsId(data.leadProjects)
      : [];
  }

  get inTrainingLabel() {
    return this.inTraining ? 'Sim' : 'Não';
  }
  private getProjectsId(projects: { projectId: string }[] = []) {
    return projects
      .map((project) => {
        if (project?.projectId) {
          return project.projectId;
        }
        return '';
      })
      .filter((it) => it);
  }

  format() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
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
