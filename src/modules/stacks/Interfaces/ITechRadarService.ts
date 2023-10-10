import { ProjectTechRadarResponse } from "../entities/Dtos/projectTechRadarResponse.1"

export interface ITechRadarService {
  getRadarTechComparison(projectIds: string): Promise<ProjectTechRadarResponse[]>
}
