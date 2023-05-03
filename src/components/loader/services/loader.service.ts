import { LoaderInterface } from './loader.interface';

class LoaderService implements LoaderInterface {
  public show: boolean;

  constructor() {
    this.show = false;
  }

  public open() {
    this.show = true;
  }

  public close() {
    this.show = false;
  }
}

const loaderService = new LoaderService();
export default loaderService;
