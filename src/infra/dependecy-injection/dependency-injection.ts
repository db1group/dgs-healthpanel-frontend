import { App } from 'vue';
import { authStore } from '../../store/modules/auth/auth-store';
import { AuthStore } from '../../store/modules/auth/auth-store.interface';
import { AuthAd, AUTH_AD } from '../auth/auth-ad';
import { MicrosoftAdService } from '../auth/microsoft-ad.service';
import { AxiosAdapter } from '../http/axios-adapter';
import { HttpClient, HTTP_CLIENT } from '../http/http';
import { DATE_SERVICE, DateService } from '../date-service/date-service';
import { DateFnsAdapter } from '../date-service/date-fns-adapter';

export class DependencyInjection {
  constructor(private readonly applicationVue: App<Element>) {}

  async execute() {
    const store: AuthStore = authStore();
    const authService: AuthAd = new MicrosoftAdService(store);
    const httpService: HttpClient = new AxiosAdapter(
      store,
      authService,
      this.applicationVue.config.globalProperties.$snackbar,
    );
    const dateService: DateService = new DateFnsAdapter();

    this.applicationVue.provide(HTTP_CLIENT, httpService);
    this.applicationVue.provide(AUTH_AD, authService);
    this.applicationVue.provide(DATE_SERVICE, dateService);
  }
}
