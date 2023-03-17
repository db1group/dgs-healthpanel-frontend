import { defineStore } from 'pinia';

export const authStore = defineStore('auth', {
  state: () => ({
    token: '',
    username: '',
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUsername(username: string) {
      this.username = username;
    },
  },
});
