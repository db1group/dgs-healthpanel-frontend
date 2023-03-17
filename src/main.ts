import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import './style.css';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

import App from './App.vue';
import { DependencyInjection } from './infra/dependecy-injection/dependency-injection';

const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'dark',
  },
});

const app = createApp(App).use(vuetify).use(pinia);
const dependencyInjectionManager = new DependencyInjection(app);
dependencyInjectionManager.execute();
app.mount('#app');
