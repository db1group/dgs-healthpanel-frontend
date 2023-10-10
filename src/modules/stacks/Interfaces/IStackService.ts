import { Stack } from "../entities/stack"

export interface IStackService {
    getAllLanguages(): Promise<Stack[]>
    getLanguageByProjectId(id: string): Promise<Stack[]>
    removeStacksFromProject(id: string, stacksId: string[]): Promise<void> 
    updateStackSonar(): Promise<Stack[]> 
    populateStackBySonar(): Promise<void> 
    addStacks(stackId: Object): Promise<boolean> 
}