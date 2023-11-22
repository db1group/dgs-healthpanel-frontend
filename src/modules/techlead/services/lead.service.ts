import { HttpClient } from '../../../infra/http/http';
import { LeadEngineer } from '../entities/lead-engineer';

export class LeadService {
  constructor(private readonly httpClient: HttpClient) {}
  save(lead: LeadEngineer) {
    const payload = lead.format();
    return this.httpClient.post('/lead', payload);
  }

  edit(lead: LeadEngineer) {
    const payload = lead.format();
    return this.httpClient.put(`/lead/${lead.id}`, payload);
  }

  delete(id: string) {
    return this.httpClient.delete(`/lead/${id}`, null);
  }

  getAllLeads(): Promise<LeadEngineer[]> {
    return this.httpClient.get('/lead').then(({ data }) => {
      return data.map((lead: any) => new LeadEngineer(lead));
    });
  }

  getLeadById(id: string): Promise<LeadEngineer> {
    return this.httpClient.get(`lead/${id}`).then(({ data }) => {
      return new LeadEngineer(data);
    });
  }
}
