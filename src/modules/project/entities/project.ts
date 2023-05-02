import { LeadEngineer } from '../../techlead/entities/lead-engineer';

export class Project {
  public id: string;

  public name: string;

  public costCenter: string;

  public lead: LeadEngineer[];

  constructor(data: any = {}) {
    this.id = data.id;
    this.name = data.name;
    this.costCenter = data.costCenter;
    this.lead = data.leadProject || [];
  }

  format() {
    return {
      id: this.id,
      name: this.name,
      costCenter: this.costCenter,
      leadProject: this.lead.length
        ? this.lead.map((it) => ({ LeadId: it }))
        : undefined,
    };
  }
}
