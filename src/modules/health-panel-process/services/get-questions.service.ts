import { HttpClient } from '../../../infra/http/http';

export class GetQuestionsService {
  constructor(private readonly http: HttpClient) {}

  async execute(): Promise<any> {
    console.log('oi');
    return this.http.get('/form').then(({ data }) => {
      return data.pillars;
    });
  }
}
