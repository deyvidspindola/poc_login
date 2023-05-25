/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import pinia from "../store";
import router from "../router";

// Types
import type { App } from "vue";
import { apiUrl } from "@/services";
import { useAuthStore } from "@/store/auth";
import { attachAuthHeaders } from "@/utils/apiUtils";

import vue3GoogleLogin from "vue3-google-login";

export function registerPlugins(app: App) {
  loadFonts();
  app.use(vuetify).use(router).use(pinia);

  const authStore = useAuthStore();
  attachAuthHeaders(apiUrl, authStore.token || "");

  app.use(vue3GoogleLogin, {
    clientId:
      "1091178841144-oe10cov0i2nherol12cl54u4j3onenj1.apps.googleusercontent.com",
  });
}
