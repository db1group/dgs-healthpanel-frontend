import { LeadEngineer } from '../../techlead/entities/lead-engineer';

export class Project {
  public id: string;

  public name: string;

  public costCenter: string;

  public leads: LeadEngineer[];

  constructor(data: any = {}) {
    this.id = data.id;
    this.name = data.name;
    this.costCenter = data.costCenter;
    this.leads = data.leadProjects?.length
      ? this.getLeads(data.leadProjects)
      : [];
  }

  private getLeads(leadProjects: any): LeadEngineer[] {
    if (!leadProjects || !leadProjects.length) {
      return [];
    }
    return leadProjects
      .map((it: any) => new LeadEngineer(it.lead))
      .filter((it: LeadEngineer) => it);
  }

  format() {
    return {
      id: this.id,
      name: this.name,
      costCenter: { id: this.costCenter },
      leadProjects: this.leads.length
        ? this.leads.map((it) => ({ LeadId: it }))
        : undefined,
    };
  }
}
