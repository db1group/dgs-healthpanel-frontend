import { HttpClient } from '../../../infra/http/http';

export class GetQuestionsService {
  constructor(private readonly http: HttpClient) {}

  async execute(project: string): Promise<any> {
    return this.http
      .get('/form', {
        params: {
          project,
        },
      })
      .then(({ data }) => {
        return data.pillars;
      });
  }
}
