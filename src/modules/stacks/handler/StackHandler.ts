import { Project } from "../../project/entities/project";
import { ProjectService } from "../../project/services/project.service";
import { StackServiceInterface } from "../Interfaces/StackServiceInterface";
import { Stack } from "../entities/stack";
import { StackService } from "../services/stack.service";

export class StackHandler {
    private projects: Project[] = []
    private stacks: Stack[] = []

    constructor(private stackService: StackService,
        private projectService: ProjectService) {}

    async getAllProjects() {
        this.projects = await this.projectService.getAllProjects()
        return this.projects
    }

    async filterProjectById(id:number) {
        const specificProjectId = this.projects.find((project, index) => index === id);       
        return await this.stackService.getLanguageByProjectId(specificProjectId!.id);
    }

    async getProjectSelected(id:number) {
        const response:Stack = await this.filterProjectById(id);
        this.stacks = response ;
    },

}