import axios from 'axios';
import { HttpClient } from './http';

export class AxiosAdapter implements HttpClient {
  private http: any;
  constructor() {
    this.http = axios.create({
      baseURL: 'http://localhost:3000',
    });
  }
  async get(url: string, config: any): Promise<any> {}
}
