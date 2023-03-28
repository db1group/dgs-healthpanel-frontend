export const HTTP_CLIENT = Symbol('HTTP_CLIENT');

export interface HttpClient {
  get(url: string, config?: any): Promise<any>;
  post(url: string, content: any, config?: any): Promise<any>;
}
