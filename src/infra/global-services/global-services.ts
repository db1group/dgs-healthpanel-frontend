import { App, reactive } from 'vue';

import loaderService from '../../components/loader/services/loader.service';

export class GlobalServices {
  constructor(private readonly applicationVue: App<Element>) {}

  async execute() {
    this.applicationVue.config.globalProperties.$loader =
      reactive(loaderService);
  }
}
