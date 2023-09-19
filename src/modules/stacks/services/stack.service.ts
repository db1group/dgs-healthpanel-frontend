import { HttpClient } from '../../../infra/http/http';
import { Stack } from '../entities/stack';

export class StackService {
  constructor(private readonly httpClient: HttpClient) {}

  getAllProjects(): Promise<Stack[]> {
    return this.httpClient.get('stack/all-languages').then(({ data }) => {
      return data.map((stack: any) => new Stack(data));
    });
  }

  getProjectById(id: string): Promise<Stack> {
    return this.httpClient.get(`stack/projects?projectId=${id}`).then(({ data }) => {
      return new Stack({});
    });
  }
}
