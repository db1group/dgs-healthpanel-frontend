import { HttpClient } from '../../../infra/http/http';
import { HealthPanel } from '../domain/health-panel';

export class SaveFormService {
  constructor(private readonly http: HttpClient) {}

  async execute(form: HealthPanel): Promise<any> {
    const payload = form.format();
    return this.http.post('/answer', payload).then(({ data }) => data);
  }
}
