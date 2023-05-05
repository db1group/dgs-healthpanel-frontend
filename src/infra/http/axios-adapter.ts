import axios from 'axios';
import { AuthStore } from '../../store/auth-store.interface';
import { HttpClient } from './http';

export class AxiosAdapter implements HttpClient {
  private http: any;
  constructor(private readonly storeService: AuthStore) {
    this.http = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
    });
    this.addInterceptors();
  }

  private addInterceptors() {
    this.http.interceptors.request.use(
      (config: any) => {
        const token = this.storeService.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: any) => Promise.reject(error),
    );
  }

  async get(url: string, config?: any): Promise<any> {
    return this.http.get(url, config);
  }

  async post(url: string, payload: any, config?: any): Promise<any> {
    return this.http.post(url, payload, config);
  }

  async put(url: string, payload: any, config?: any): Promise<any> {
    return this.http.put(url, payload, config);
  }
}
