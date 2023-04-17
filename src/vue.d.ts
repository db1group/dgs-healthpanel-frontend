import Vue from 'vue';

import { LoaderInterface } from './components/loader/interfaces/loader.interface';

declare module 'vue' {
  // eslint-disable-next-line no-shadow
  interface Vue {
    $loader: LoaderInterface;
  }
}
