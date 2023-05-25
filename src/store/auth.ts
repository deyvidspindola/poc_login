import type { IGetUsersData, IUserLogin } from "@/interfaces/authInterface";
import router from "@/router";
import { apiUrl } from "@/services";
import authService from "@/services/auth";
import { attachAuthHeaders, removeAuthHeaders } from "@/utils/apiUtils";
import { defineStore } from "pinia";
import pinia from ".";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    token: "" as string,
    expire_token: "" as string,
    user: "" as unknown as IGetUsersData,
  }),
  getters: {
    loggedIn: (state) => state.user.id !== null,
  },
  actions: {
    async login() {
      try {
        return await authService
          .logingoolge()
          .then(async (response) => {
            if (response.status === 200) {
              window.location.href = response.data.authorization_endpoint;
            }
            return false;
          })
          .catch((err: any) => {
            throw err;
          });
      } catch (error: any) {
        throw Error(error);
      }
    },
    async googleLogin() {
      try {
        return await authService
          .logingoolge()
          .then(async (response) => {
            if (response.status === 200) {
              window.location.href = response.data.authorization_endpoint;
            }
            return false;
          })
          .catch((err: any) => {
            throw err;
          });
      } catch (error: any) {
        throw Error(error);
      }
    },
    async redirectDrupal(param: any) {
      try {
        return await authService
          .redirectDrupal(param)
          .then(async (response) => {
            attachAuthHeaders(apiUrl, response.data.id_token);
            this.token = response.data.id_token;
            this.expire_token = response.data.expire;
            return await this.updateStore();
          })
          .catch((err: any) => {
            throw err;
          });
      } catch (error: any) {
        throw Error(error);
      }
    },
    async updateStore() {
      this.isLoggedIn = true;
      return true;
      // return await authService.validateToken().then((response) => {
      //   if (response.status === 200) {
      //     this.user = response.data;
      //     this.isLoggedIn = true;
      //     return true;
      //   }
      //   return false;
      // });
    },
    async logout() {
      removeAuthHeaders(apiUrl);
      window.localStorage.clear();
      this.isLoggedIn = false;
      this.token = "";
      this.expire_token = "";
      router.push({ name: "Login" });
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});

export function setupAuthStore() {
  return useAuthStore(pinia);
}
