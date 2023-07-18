import axios, { AxiosError, AxiosResponse } from 'axios';
import { AuthStore } from '../../store/auth-store.interface';
import { HttpClient } from './http';
import { AuthAd } from '../auth/auth-ad';
import { ISnackbar } from '../../components/snackbar/interfaces/snackbar.interface';

export class AxiosAdapter implements HttpClient {
  private http: any;
  constructor(
    private readonly storeService: AuthStore,
    private readonly authService: AuthAd,
    private readonly snackbarService: ISnackbar,
  ) {
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

    this.http.interceptors.response.use(
      (axiosResponse: AxiosResponse) => axiosResponse,
      (axiosError: AxiosError): any => {
        const request = axiosError.config;
        if (axiosError.response && axiosError.response.status === 401) {
          this,
            this.authService
              .refreshToken()
              .then((newToken: string) => {
                this.storeService.setToken(newToken);
                return this.http(request);
              })
              .catch((err: any) => {
                this.snackbarService.open({
                  text: 'Sua sessão expirou, faça login novamente',
                  color: 'error',
                });
                throw new Error(`Não foi possivel setar o novo token ${err}`);
              });
        }

        return Promise.reject(axiosError);
      },
    );
    this.http.interceptors.response.use(
      (axiosResponse: AxiosResponse) => axiosResponse,
      (axiosError: AxiosError): any => {
        const request = axiosError.config;
        if (axiosError.response && axiosError.response.status === 401) {
          this,
            this.authService.refreshToken().then((newToken: string) => {
              this.storeService.setToken(newToken);
              return this.http(request);
            });
        }

        return Promise.reject(axiosError);
      },
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
