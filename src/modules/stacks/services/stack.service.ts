import { HttpClient } from '../../../infra/http/http';
import { IStackService } from '../Interfaces/IStackService';
import { Stack } from '../entities/stack';

export class StackService implements IStackService {
  constructor(private readonly httpClient: HttpClient) {}

  getAllLanguages(): Promise<Stack[]> {
    return this.httpClient.get('stack/all-languages').then(({ data }) => {
      return data.map((data: any) => new Stack(data));
    });
  }

  getLanguageByProjectId(id: string): Promise<Stack[]> {
    return this.httpClient.get(`stack/projects?`, {
      params: {
        projectId: id
      }
    }).then(({ data }) => {      
      return data[0].stacks;
    });
  }

  removeStacksFromProject(id: string, stacksId: string[]): Promise<void> {
    return this.httpClient
      .put(`project/${id}/disable-stacks`,  { stacksId: stacksId })
      .then(({ data }) => { return data; });
  }

  updateStackSonar(): Promise<Stack[]> {
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
