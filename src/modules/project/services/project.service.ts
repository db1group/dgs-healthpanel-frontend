import { HttpClient } from '../../../infra/http/http';
import { Project } from '../entities/project';

export class ProjectService {
  constructor(private readonly httpClient: HttpClient) {}

  getAllProjects(): Promise<Project[]> {
    return this.httpClient.get('/project').then(({ data }) => {
      return data.map((project: any) => new Project(project));
    });
  }

  getProjectById(id: string): Promise<Project> {
    return this.httpClient
      .get('/api/project', { params: { id } })
      .then(({ data }) => {
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
}
