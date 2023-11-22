import { HttpClient } from '../../../infra/http/http';
import { IProjectService } from '../Interfaces/IProjectService';
import { CostCenter } from '../entities/cost-center';
import { Project } from '../entities/project';

export class ProjectService implements IProjectService {
  constructor(private readonly httpClient: HttpClient) {}

  getAllProjects(): Promise<Project[]> {
    return this.httpClient.get('/project').then(({ data }) => {
      return data.map((project: any) => new Project(project));
    });
  }

  getAllCenterOfCosts(): Promise<CostCenter[]> {
    return this.httpClient.get('/costcenter').then(({ data }) => {
      return data.map((costCenter: any) => new CostCenter(costCenter));
    });
  }

  getProjectById(id: string): Promise<Project> {
    return this.httpClient.get(`/project/${id}`).then(({ data }) => {
      return new Project(data);
    });
  }

  save(project: Project): Promise<void> {
    const payload = project.format();
    return this.httpClient.post('/project', payload);
  }

  edit(project: Project): Promise<void> {
    const payload = project.format();
    return this.httpClient.put(`/project/${project.id}`, payload);
  }

  delete(id: string): Promise<void> {
    return this.httpClient.delete(`/project/${id}`, null);
  }
}
