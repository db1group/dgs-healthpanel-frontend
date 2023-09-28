import { Stack } from "../entities/stack"

export interface StackServiceInterface {
    getAllLanguages(): Promise<Stack[]>
    getLanguageByProjectId(id: string): Promise<Stack>
    updateStackByProject(id: string, stacksId: Object): Promise<Stack> 
    updateStackSonar(): Promise<Stack> 
    populateStackBySonar(): Promise<void> 
    addStacks(stackId: Object): Promise<boolean> 
}