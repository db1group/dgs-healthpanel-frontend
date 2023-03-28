import { HttpClient } from '../../../infra/http/http';
import { HealthPanel } from '../domain/health-panel';

export class SaveFormService {
  constructor(private readonly http: HttpClient) {}

  async execute(form: HealthPanel): Promise<any> {
    return this.http.post('/form', form).then(({ data }) => data);
  }
}
