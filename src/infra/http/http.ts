export const HTTP_CLIENT = Symbol('HTTP_CLIENT');

export interface HttpClient {
  delete(url: string, content: any): Promise<any>;
  get(url: string, config?: any): Promise<any>;
  post(url: string, content: any, config?: any): Promise<any>;
  put(url: string, content: any, config?: any): Promise<any>;
  patch(url: string, content?: any, config?: any): Promise<any>;
}
