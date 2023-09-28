export class StackToInclude {
    projectId: string
    StackId: string

    constructor(data:any = {}) {
        this.projectId = data.projectId;
        this.StackId = data.StackId;
    }
}