import { IUserLogin } from "@/interfaces/authInterface";
import { apiUrl } from ".";
import { setupAuthStore } from "@/store/auth";

const authService = {
  async login(payload: IUserLogin) {
    return apiUrl
      .post("/auth", payload)
      .then((response) => response)
      .catch((err: Error) => {
        throw err;
      });
  },

  async logingoolge() {
    return apiUrl
      .get("/login/ecoe")
      .then((response) => response)
      .catch((err: Error) => {
        throw err;
      });
  },

  async redirectDrupal(param: any) {
    return apiUrl.post(`/login/token${param}`);
  },

  async validateToken() {
    try {
      const response = await apiUrl.get("/auth/token");
      return response;
    } catch (error: any) {
      return error.response;
    }
  },

  async isAuthenticated() {
    const authStore = setupAuthStore();
    // const checkToken = await this.validateToken();
    if (!authStore.isLoggedIn) {
      return false;
    } else if (authStore.isLoggedIn) {
      return true;
    }
    return false;
  },
};

export default authService;
