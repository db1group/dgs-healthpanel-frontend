import { CostCenter } from "../entities/cost-center"
import { Project } from "../entities/project"

export interface IProjectService {
    getAllProjects(): Promise<Project[]>
    getAllCenterOfCosts(): Promise<CostCenter[]>
    getProjectById(id: string): Promise<Project>
    save(project: Project): Promise<void>
    edit(project: Project): Promise<void>
    delete(id: string): Promise<void>
}