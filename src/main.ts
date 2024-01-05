import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import './styles/style.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { VDataTable } from 'vuetify/labs/VDataTable';

import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { healthPanelThemeDark } from './theme/vuetify.dark-theme';
import App from './App.vue';
import { DependencyInjection } from './infra/dependecy-injection/dependency-injection';
import { router } from './router/router';
import { GlobalServices } from './infra/global-services/global-services';
import { LoaderInterface } from './components/loader/services/loader.interface';
import { ISnackbar } from './components/snackbar/interfaces/snackbar.interface';
import { ChartRegister } from './infra/chart/chart.register';
import { i18n } from './infra/i18n/i18n';

const pinia = createPinia();
const vuetify = createVuetify({
  components: {
    ...components,
    VDataTable,
  },
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'healthPanelThemeDark',
    themes: {
      healthPanelThemeDark,
    },
  },
});

const app = createApp(App).use(vuetify).use(pinia).use(router).use(i18n);

const dependencyInjectionManager = new DependencyInjection(app);
const globalServicesManager = new GlobalServices(app);
dependencyInjectionManager.execute();
globalServicesManager.execute();
ChartRegister.register();

app.mount('#app');

declare module 'vue' {
  interface ComponentCustomProperties {
    $loader: LoaderInterface;
    $snackbar: ISnackbar;
  }
}
