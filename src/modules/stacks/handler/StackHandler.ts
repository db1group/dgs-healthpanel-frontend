import { IProjectService } from "../../project/Interfaces/IProjectService";
import { Project } from "../../project/entities/project";
import { IStackService } from "../Interfaces/IStackService";
import { StackToInclude } from "../entities/Dtos/stackToInclude";
import { StackToRemove } from "../entities/Dtos/stackToRemove";
import { Stack } from "../entities/stack";

export class StackHandler {
    public projects: Project[] = []
    public projectsNames: string[] = []
    public stacks: Stack[] = []
    public sonarStackList: Stack[] = []
    public stackList: Stack[] = []
    public sonarStackNames: Stack[] = []
    public selectedProjectsNames: string[] = []

    constructor(
      private readonly stackService: IStackService,
      private readonly projectService: IProjectService) {}

    async getAllProjects() {
        this.projects = await this.projectService.getAllProjects();
        this.projectsNames = this.projects.map(project => project.name);
        return this.projects;
    }

    async getStacksById(id:string) {
      this.stacks = await this.stackService.getLanguageByProjectId(id);
      return this.stacks;
    }

    async consultStackFromSonar() {
        this.sonarStackList = await this.stackService.updateStackSonar()
        this.stackList = Object.values(this.sonarStackList);
        this.sonarStackNames = this.stackList
        .map((obj) => Object.values(obj)[1])
        .sort();

        return this.sonarStackList;
    }

    async removeStack(projectId: string, stackIndex: number) {
        const stack = this.stacks[stackIndex];

        await this.stackService.removeStacksFromProject(projectId,[stack.stackId])
            .then( () => this.stacks.splice(stackIndex, 1));        
    }

    async addStack(projectId: string, stack: string) {
        this.sonarStackList.map((item) => {
            if(item.stackName === stack) {
                stack = item.stackId
            }
        })
        const stackToInclude: StackToInclude = {
            projectId,
            stackId: stack
        }
        return await this.stackService.addStacks(stackToInclude).then(
            data => data
        ).catch(
            err => err
        )
    }

    haveToShowProject(projects: string): boolean {
        return this.selectedProjectsNames.includes(projects) ||
        this.selectedProjectsNames.length === 0
    }
}
