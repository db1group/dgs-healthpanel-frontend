export class Project {
  public id: string;

  public name: string;

  public description: string;

  public lead: string;

  constructor(data: any = {}) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.lead = data.lead;
  }
}
