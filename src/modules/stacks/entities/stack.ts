export class Stack {
    public stackId:string;
    public stackName:string;

    constructor(data:any = {}) {
        this.stackId = data.stackId;
        this.stackName = data.stackName;
    }

    format() {
        return [{
            stackId: this.stackId,
            stackName: this.stackName
        }]
    }
}