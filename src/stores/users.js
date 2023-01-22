import { defineStore } from "pinia";
import axios from "axios";
const API = import.meta.env.VITE_APP_API;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async register(data) {
      const response = await axios.post(API + "register", data);
      this.token = response.data;
      localStorage.setItem("token", response.data);
    },
    async login(data) {
      const response = await axios.post(API + "login", data);
      this.token = response.data;
      localStorage.setItem("token", response.data);
      this.getUserData();
    },
    logout() {
      localStorage.removeItem("token");
      this.token = null;
      this.user = null;
    },
    async getUserData() {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(API + "user", config);
      this.user = response.data;
    },
    tryLogin() {
      const token = localStorage.getItem("token");
      if (token) {
        this.token = token;
        this.getUserData();
      }
    },
  },
});
