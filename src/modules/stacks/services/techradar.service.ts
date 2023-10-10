import { HttpClient } from '../../../infra/http/http';
import { ITechRadarService } from '../Interfaces/ITechRadarService';
import { ProjectTechRadarResponse } from "../entities/Dtos/projectTechRadarResponse.1";

export class TechRadarService implements ITechRadarService {

  constructor(private readonly httpClient: HttpClient) {}

  getRadarTechComparisonByList(projectIds: string[]): Promise<ProjectTechRadarResponse[]> {
    return this.httpClient.get('TechRadar/compare', { params: { projectIds: projectIds[0] } }).then(({ data }) => {
      return data.map((data: any) => new ProjectTechRadarResponse(data));
    });
  }
}
