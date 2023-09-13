import { LeadEngineer } from '../../techlead/entities/lead-engineer';
import { CostCenter } from './cost-center';

export class Project {
  public id: string;

  public name: string;

  public costCenter: CostCenter;

  public leads: LeadEngineer[];
  public leadNames: string;

  constructor(data: any = {}) {
    this.id = data.id;
    this.name = data.name;
    this.costCenter = new CostCenter(data.costCenter);
    this.leads = data.leadProjects?.length
      ? this.getLeads(data.leadProjects)
      : [];
    this.leadNames = this.getLeadsNames(this.leads);
  }

  private getLeads(leadProjects: any): LeadEngineer[] {
    if (!leadProjects || !leadProjects.length) {
      return [];
    }
    return leadProjects
      .map((it: any) => new LeadEngineer(it.lead))
      .filter((it: LeadEngineer) => it);
  }

  private getLeadsNames(leadEngineer: LeadEngineer[]): string {
    if (!leadEngineer || !leadEngineer.length) {
      return '';
    }

    let names = leadEngineer
    .map((it: LeadEngineer) => it.name);

    return names.join(', ');
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
