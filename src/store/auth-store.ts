import { defineStore } from 'pinia';

export const authStore = defineStore('auth', {
  state: () => ({
    userToken: '',
    username: '',
  }),
  getters: {
    token(): string {
      return this.userToken;
    },
  },
  actions: {
    setToken(token: string) {
      this.userToken = token;
    },
    setUsername(username: string) {
      this.username = username;
    },
  },
});
