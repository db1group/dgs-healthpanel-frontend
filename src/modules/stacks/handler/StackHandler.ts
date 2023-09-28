import { Project } from "../../project/entities/project";
import { ProjectService } from "../../project/services/project.service";
import { Stack } from "../entities/stack";
import { StackToRemove } from "../entities/Dtos/stackToRemove";
import { StackService } from "../services/stack.service";
import { StackToInclude } from "../entities/Dtos/stackToInclude";

export class StackHandler {
    private projects: Project[] = []
    private stacks: Stack[] = []
    private sonarStackList: Stack[] = []

    constructor(private stackService: StackService,
        private projectService: ProjectService) {}

    async getAllProjects() {
        this.projects = await this.projectService.getAllProjects()
        return this.projects
    }

    async filterProjectById(id:number) {
        const specificProjectId = this.projects.find((project, index) => index === id);
        this.stacks = await this.stackService.getLanguageByProjectId(specificProjectId!.id)
        return this.stacks;
    }

    async consultStackFromSonar() {
        this.sonarStackList = await this.stackService.updateStackSonar()
        return this.sonarStackList;			
    }

    async removeStack(projectId: string, stackIndex: number) {
        console.log(this.stacks);
        
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