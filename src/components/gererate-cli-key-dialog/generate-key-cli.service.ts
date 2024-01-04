import { HttpClient } from '../../infra/http/http';

export class GenerateKeyCliService {
  constructor(private readonly httpClient: HttpClient) {}

  async generateKey(projectId: string): Promise<string> {
    const response = await this.httpClient.post('/generate-key', {
      params: {
        projectId,
      },
    });
    return response?.data?.key;
  }
}

export interface GenerateKeyOutput {
  key: string;
  projectId: string;
  leadId: string;
  createdAt: string;
}
