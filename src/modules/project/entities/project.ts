import { LeadEngineer } from '../../techlead/entities/lead-engineer';
import { CostCenter } from './cost-center';

export class Project {
  public id: string;

  public name: string;

  public costCenter: CostCenter;

  public leads: LeadEngineer[];

  constructor(data: any = {}) {
    this.id = data.id;
    this.name = data.name;
    this.costCenter = new CostCenter(data.costCenter);
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

  get leadsNames(): string {
    if (!this.leads || !this.leads.length) {
      return '';
    }

    return this.leads
      .map((it: LeadEngineer) => it.name)
      .join(', ');
  }

  format() {
    return {
      id: this.id,
      name: this.name,
      costCenter: { id: this.costCenter.id },
      leadProjects: this.leads.length
        ? this.leads.map((it) => ({ LeadId: it.id }))
        : undefined,
    };
  }
}
