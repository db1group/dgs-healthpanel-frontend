import { LeadEngineer } from '../../techlead/entities/lead-engineer';

export class Project {
  public id: string;

  public name: string;

  public centerOfCost: string;

  public lead: LeadEngineer[];

  constructor(data: any = {}) {
    this.id = data.id;
    this.name = data.name;
    this.centerOfCost = data.centerOfCost;
    this.lead = data.lead || [];
  }

  format() {
    return {
      id: this.id,
      name: this.name,
      centerOfCost: this.centerOfCost,
      lead: this.lead.length ? this.lead.map((it) => it.id) : undefined,
    };
  }
}
