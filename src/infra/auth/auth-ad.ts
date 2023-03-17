export const AUTH_AD = Symbol('AUTH_AD');
export interface AuthAd {
  connect(): Promise<boolean>;
}
