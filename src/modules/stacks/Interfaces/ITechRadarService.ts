import { ProjectTechRadarResponse } from "../entities/Dtos/projectTechRadarResponse.1"

export interface ITechRadarService {
  getRadarTechComparisonByList(projectsIds: string[]): Promise<ProjectTechRadarResponse[]>
}
