import { LeadEngineer } from '../../techlead/entities/lead-engineer';
import { CostCenter } from './cost-center';

export class Project {
  public id: string;

  public name: string;

  public sonarName: string;

  public sonarUrl: string;

  public sonarToken: string;

  public usesCli: boolean;

  public sonarKeys: string;

  public costCenter: CostCenter;

  public leads: LeadEngineer[];

  constructor(data: any = {}) {
    this.id = data.id;
    this.name = data.name;
    this.usesCli = data.usesCli === true;
    this.sonarName = data.sonarName;
    this.sonarUrl = data.sonarUrl;
    this.sonarToken = data.sonarToken;
    this.sonarKeys = data.sonarProjectKeys;
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
      .map((it: any) => new LeadEngineer(it))
      .filter((it: LeadEngineer) => it);
  }

  get leadsNames(): string {
    if (!this.leads || !this.leads.length) {
      return '';
    }
    return this.leads.map((it) => it.name).join(', ');
  }

  format() {
    return {
      id: this.id,
      name: this.name,
      sonarName: this.sonarName,
      sonarToken: this.sonarToken,
      sonarUrl: this.sonarUrl,
      usesCli: this.usesCli === true,
      sonarProjectKeys: this.sonarKeys,
      costCenter: { id: this.costCenter.id },
      leadProjects: this.leads.length
        ? this.leads.map((it) => ({ LeadId: it.id }))
        : undefined,
    };
  }
}
