export interface EvaluationFilter {
  format(): BackendEvaluationFilter;
}

export type BackendEvaluationFilter = {
  startDate?: string;
  endDate?: string;
  costCenterIds?: string[];
};
