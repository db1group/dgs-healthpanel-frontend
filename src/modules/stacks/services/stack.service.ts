import { HttpClient } from '../../../infra/http/http';
import { Stack } from '../entities/stack';

export class StackService {
  constructor(private readonly httpClient: HttpClient) {}

  getAllLanguages(): Promise<Stack[]> {
    return this.httpClient.get('stack/all-languages').then(({ data }) => {
      return data.map((data: any) => new Stack(data));
    });
  }

  getLanguageByProjectId(id: string): Promise<Stack> {
    return this.httpClient.get(`stack/projects?projectId=${id}`).then(({ data }) => {      
      console.log(data);
      
      return data[0].stacks;
    });
  }
}
