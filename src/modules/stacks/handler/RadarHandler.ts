import { ITechRadarService } from "../Interfaces/ITechRadarService";
import { ProjectTechRadarResponse } from "../entities/Dtos/projectTechRadarResponse.1";
import { TechRadarResponse } from "../entities/Dtos/techRadarResponse";
import { RING } from "../entities/ring";

export class RadarHandler {
    public stackComparisson: ProjectTechRadarResponse = new ProjectTechRadarResponse();

    constructor(
      private readonly techRadarService: ITechRadarService) {}

    async getTechComparissonByIds(id:string) {
      this.stackComparisson = (await this.techRadarService.getRadarTechComparison(id)).find(e => e.projectId ===id)!;
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
}
