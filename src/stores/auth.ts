import { getMe, login } from "@/api-client/auth";
import { defineStore } from "pinia";
import type { UserRead } from "@/api-client/types";

interface AuthState {
  token: string | null;
  user: UserRead | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => {
    var user = null
    let userString = localStorage.getItem("user")
    if (userString) {
      user = JSON.parse(userString)
    }
    return ({
      token: localStorage.getItem("access_token"),
      user: user,
    })},

  getters: {
    isAuthenticated: (state) => state.token != null,
    isAdmin: (state) => state.user?.role == "админ",
  },

  actions: {
    async login(username: string, password: string) {
      const resp = await login({ username, password });

      // сохраняем токен в стор и в localStorage
      this.token = resp.access_token;
      localStorage.setItem("access_token", resp.access_token);

      // загружаем профиль (если эндпоинт доступен)
      try {
        const me = await getMe();
        localStorage.setItem("user", JSON.stringify(me))
        this.user = me;
      } catch (e) {
        console.error("Ошибка загрузки профиля:", e);
        this.user = null;
      }

      return this.user;
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("user")
    },
  },
});
