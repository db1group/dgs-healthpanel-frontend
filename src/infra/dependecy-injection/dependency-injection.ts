import Vue, { App } from 'vue';
import { authStore } from '../../store/auth-store';
import { AuthStore } from '../../store/auth-store.interface';
import { AuthAd, AUTH_AD } from '../auth/auth-ad';
import { MicrosoftAdService } from '../auth/microsoft-ad.service';
import { AxiosAdapter } from '../http/axios-adapter';
import { HttpClient, HTTP_CLIENT } from '../http/http';

export class DependencyInjection {
  constructor(private readonly applicationVue: App<Element>) {}

  execute() {
    const httpService: HttpClient = new AxiosAdapter();
    const store: AuthStore = authStore();
    const authService: AuthAd = new MicrosoftAdService(store);

    this.applicationVue.provide(HTTP_CLIENT, httpService);
    this.applicationVue.provide(AUTH_AD, authService);
  }
}
