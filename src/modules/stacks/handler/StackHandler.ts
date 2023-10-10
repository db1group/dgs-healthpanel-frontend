import { Project } from "../../project/entities/project";
import { Stack } from "../entities/stack";
import { StackToRemove } from "../entities/Dtos/stackToRemove";
import { StackToInclude } from "../entities/Dtos/stackToInclude";
import { IStackService } from "../Interfaces/IStackService";
import { IProjectService } from "../../project/Interfaces/IProjectService";
import { ITechRadarService } from "../Interfaces/ITechRadarService";
import { ProjectTechRadarResponse } from "../entities/Dtos/projectTechRadarResponse.1";
import { TechRadarResponse } from "../entities/Dtos/techRadarResponse";
import { RING } from "../entities/ring";

export class StackHandler {
    public projects: Project[] = []
    public projectsNames: string[] = []
    public stacks: Stack[] = []
    public stackComparisson: ProjectTechRadarResponse | undefined = new ProjectTechRadarResponse();
    public sonarStackList: Stack[] = []
    public stackList: Stack[] = []
    public sonarStackNames: Stack[] = []
    public selectedProjectsNames: string[] = []

    constructor(
      private readonly stackService: IStackService,
      private readonly projectService: IProjectService,
      private readonly techRadarService: ITechRadarService) {}

    async getAllProjects() {
        this.projects = await this.projectService.getAllProjects();
        this.projectsNames = this.projects.map(project => project.name);
        return this.projects;
    }

    async getStacksById(id:string) {
      this.stacks = await this.stackService.getLanguageByProjectId(id);
      return this.stacks;
    }

    async getTechComparissonByIds(id:string) {
      this.stackComparisson = await (await this.techRadarService.getRadarTechComparisonByList([id])).find(e => e.projectId === id);
      return this.stackComparisson;
    }

    resolveStackColor(techResponse:TechRadarResponse): string{
      switch(techResponse.ring) {
        case RING.ADOPT:
          return 'green'
        case RING.ASSESS:
          return 'yellow'
        case RING.EXPERIMENT:
          return 'blue'
        case RING.AVOID:
          return 'red';
        default:
          return 'grey';
      }
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
        this.stacks.splice(stackIndex, 1)
        const stacksId: string[] = this.stacks.map((stack) => {
            return stack.stackId;
        })
        const stackId: StackToRemove = {
            projectId,
            stacksId
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
