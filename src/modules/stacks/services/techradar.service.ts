import { HttpClient } from '../../../infra/http/http';
import { ITechRadarService } from '../Interfaces/ITechRadarService';
import { ProjectTechRadarResponse } from "../entities/Dtos/projectTechRadarResponse.1";

export class TechRadarService implements ITechRadarService {

  constructor(private readonly httpClient: HttpClient) {}

  getRadarTechComparison(projectId: string): Promise<ProjectTechRadarResponse[]> {
    return this.httpClient.get('TechRadar/compare', { params: { projectIds: projectId } }).then(({ data }) => {
      return data.map((data: any) => new ProjectTechRadarResponse(data));
    });
  }
}
