export interface AuthStore {
  username: string;
  token: string;
  setToken(token: string): void;
  setUsername(username: string): void;
  setUserCode(code: string): void;
}
