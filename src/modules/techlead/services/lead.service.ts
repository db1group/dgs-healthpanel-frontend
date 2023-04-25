import { HttpClient } from '../../../infra/http/http';
import { LeadEngineer } from '../entities/lead-engineer';

export class LeadService {
  constructor(private readonly httpClient: HttpClient) {}
  save(lead: LeadEngineer) {
    const payload = lead.format();
    return this.httpClient.post('/api/lead', payload);
  }

  edit(lead: LeadEngineer) {
    const payload = lead.format();
    return this.httpClient.put(`/api/lead/${lead.id}`, payload);
  }

  getAllLeads(): Promise<LeadEngineer[]> {
    return this.httpClient.get('/api/lead').then((data) => {
      return data.map((lead: any) => new LeadEngineer(lead));
    });
  }

  getLeadById(id: string): Promise<LeadEngineer> {
    return this.httpClient.get('/api/lead', { params: { id } }).then((data) => {
      return new LeadEngineer(data);
    });
  }
}
