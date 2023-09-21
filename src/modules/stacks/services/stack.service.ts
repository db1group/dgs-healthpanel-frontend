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
      return data[0].stacks;
    });
  }

  updateStackByProject(id: string, stacksId: Object): Promise<Stack> {
    return this.httpClient.put(`stack/project/${id}/confirm-stacks`, stacksId).then(({ data }) => {      
      return data;
    });
  }

  updateStackSonar(): Promise<Stack> {
    return this.httpClient.get(`stack/all-languages`).then(({ data }) => {      
      return data.map((data: any) => new Stack(data));
    });
  }

  populateStackBySonar(): Promise<void> {
    return this.httpClient.patch('stack/projects/populate-all').then(({ data }) => {
      return data;
    })
  }

  addStacks(stackId: Object): Promise<boolean> {
    return this.httpClient.post(`stack/add/stack`, stackId).then(({ data }) => {
      return data
    })
  }
}
