import { Project } from "../../project/entities/project";
import { Stack } from "../entities/stack";
import { StackToRemove } from "../entities/Dtos/stackToRemove";
import { StackToInclude } from "../entities/Dtos/stackToInclude";
import { IStackService } from "../Interfaces/IStackService";
import { IProjectService } from "../../project/Interfaces/IProjectService";

export class StackHandler {
    public projects: Project[] = []
    public projectsNames: string[] = []
    public stacks: Stack[] = []
    public sonarStackList: Stack[] = []
    public stackList: Stack[] = []

    constructor(private readonly stackService: IStackService, private readonly projectService: IProjectService) {}

    async getAllProjects() {
        this.projects = await this.projectService.getAllProjects()
        this.projectsNames = this.projects.map(project => project.name)
        return this.projects
    }

    async filterProjectById(id:number) {
        const specificProjectId = this.projects.find((project, index) => index === id);
        this.stacks = await this.stackService.getLanguageByProjectId(specificProjectId!.id)
        return this.stacks;
    }

    async consultStackFromSonar() {
        this.sonarStackList = await this.stackService.updateStackSonar()
        this.stackList = Object.values(this.sonarStackList);
        
        return this.sonarStackList;			
    }

    async removeStack(projectId: string, stackIndex: number) {
        this.stacks.splice(stackIndex, 1)
        const StacksId: string[] = [];
        this.stacks.map((stack) => {
            StacksId.push(stack.stackId);
        })
        const stackId: StackToRemove = {
            projectId,
            StacksId
        };
        await this.stackService.updateStackByProject(projectId, stackId);
    }

    async addStack(projectId: string, stack: string) {
        this.sonarStackList.map((item) => {
            if(item.stackName === stack) {
                stack = item.stackId
            }
        })
        const stackToInclude: StackToInclude = {
            projectId,
            StackId: stack
        }
        return await this.stackService.addStacks(stackToInclude).then(
            data => data
        ).catch(
            err => err
        )
    }
}