export class CostCenter {
  public id: string;

  public name: string;

  constructor(data: any = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
  }
}
