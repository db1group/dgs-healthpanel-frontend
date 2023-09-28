export class StackToRemove {
    projectId: string
    StacksId: string[]

    constructor(data:any = {}) {
        this.projectId = data.projectId;
        this.StacksId = data.StackId;
    }
}