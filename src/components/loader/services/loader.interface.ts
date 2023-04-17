export const LOADER_SERVICE = Symbol('LOADER_SERVICE');
export interface LoaderInterface {
  open: Function;
  close: Function;
  show: boolean;
}
