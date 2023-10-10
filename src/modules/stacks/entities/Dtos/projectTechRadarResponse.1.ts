import { AdherenceResponse } from "./adherenceResponse";
import { TechRadarResponse } from "./techRadarResponse";


export class ProjectTechRadarResponse {
  projectId: string;
  techRadarResponses: TechRadarResponse[];
  adherenceResponse: AdherenceResponse;

  constructor(data: any = {}) {
    this.projectId = data.projectId;
    this.techRadarResponses = data.techRadarResponses;
    this.adherenceResponse = data.adherenceResponse;
  }
}
