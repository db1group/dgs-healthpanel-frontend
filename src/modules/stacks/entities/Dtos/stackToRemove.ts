export class StackToRemove {
    projectId: string
    stacksId: string[]

    constructor(data:any = {}) {
        this.projectId = data.projectId;
        this.stacksId = data.stackId;
    }
}