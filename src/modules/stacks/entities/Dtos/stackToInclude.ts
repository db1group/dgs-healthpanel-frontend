export class StackToInclude {
    projectId: string
    stackId: string

    constructor(data:any = {}) {
        this.projectId = data.projectId;
        this.stackId = data.stackId;
    }
}