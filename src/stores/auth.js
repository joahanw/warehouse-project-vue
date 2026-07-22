import { defineStore } from "pinia";
import { APP_CONFIG } from "../config/app";
import { clearAllLocalStorage } from "@/js/api";
import { getMerchants } from "@/js/api/merchants";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: null,
    merchantData: null,
  }),
  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
    userRole: (state) => state.user?.roleName || null,
    currentToken: (state) => state.token,
    currentMerchant: (state) => state.merchantData,
  },
  actions: {
    async login(credentials) {
      try {
        const response = await fetch(
          `${APP_CONFIG.API.BASE_URL}${APP_CONFIG.API.LOGIN_ENDPOINT}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/vnd.johanwork+json;v=1.0",
            },
            body: JSON.stringify(credentials),
          },
        );
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Login failed");
        }

        const data = await response.json();
        const { token, user } = data.data;

        this.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          roles: user.roleName,
          avatar: user.photo || "/src/assets/images/photos/photos-1.png",
        };

        this.token = token;
        this.isAuthenticated = true;

        localStorage.setItem("auth_token", token);
        localStorage.setItem("user", JSON.stringify(this.user));

        const roles = user.roleName.toLowerCase().split(",");
        if (roles.includes("keeper")) {
          await this.fetchAndStoreMerchants();
        }
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },

    async fetchAndStoreMerchants() {
      try {
        if (!this.user?.id) {
          console.error("User ID not found");
          return;
        }

        const response = await getMerchants(`?keeperId=${this.user.id}`);
        if (response.data) {
          const merchantData = Array.isArray(response.data.content)
            ? response.data.content
            : [response.data.content];
          const merchantDataForStorage = merchantData.map((merchant) => ({
            id: merchant.id,
            name: merchant.name,
            address: merchant.address,
            photo: merchant.photo,
            phone: merchant.phone,
            keeperId: merchant.keeperId,
            keeperName: merchant.keeperName,
          }));

          this.merchantData = merchantDataForStorage;
          localStorage.setItem(
            "merchant_data",
            JSON.stringify(merchantDataForStorage),
          );
        }
      } catch (error) {
        console.error("Error fetching and storing merchants:", error);
        return null;
      }
    },

    getRedirectUrl() {
      const roles = this.user?.roles?.toLowerCase().split(",");
      if (roles.includes("manager")) {
        return "/overview";
      }
      if (roles.includes("keeper")) {
        return "/overview-merchant";
      }
      return "/";
    },

    resetState() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
    },

    clearLocalStorageData() {
      clearAllLocalStorage();
      this.resetState();
    },

    hasAccess(requiredRole) {
      const userRole = this.user?.roles?.toLowerCase().split(",");
      const roleHierarchy = {
        manager: 2,
        keeper: 1,
        user: 0,
      };
      const userRoleHighest = userRole.reduce(
        (max, role) => Math.max(roleHierarchy[role] || 0, max),
        -Infinity,
      );

      return userRoleHighest >= roleHierarchy[requiredRole];
    },

    async checkAuth() {
      try {
        const token = localStorage.getItem("auth_token");
        const user = localStorage.getItem("user");

        if (token && user) {
          this.token = token;
          this.user = JSON.parse(user);
          this.isAuthenticated = true;

          return true;
        }
        return false;
      } catch (error) {
        console.error("Error checking authentucation:", error);
        this.clearLocalStorageData();
        return false;
      }
    },

    async logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      this.merchantData = null;

      this.clearLocalStorageData();
    },

    async refreshMerchantData() {
      const roles = this.user?.roles?.toLowerCase().split(",");
      if (roles.includes("keeper")) {
        await this.fetchAndStoreMerchants();
      }
    },

    getMerchantData() {
      if (this.merchantData) {
        return this.merchantData;
      }
      const storedData = localStorage.getItem("merchant_data");
      if (storedData) {
        this.merchantData = JSON.parse(storedData);
        return this.merchantData;
      }
      return null;
    },

    // async fetchCurrentUser() {
    //   try {
    //     const { getUserById } = await import("@/js/api/users");
    //     const response = await getUserById(this.user.id);

    //     if (response.data) {
    //       this.user = {
    //         id: response.data.id,
    //         email: response.data.email,
    //         name: this.user.name || response.data.email.split("@")[0],
    //         roles: this.user.roles,
    //         avatar:
    //           response.data.photo || "/src/assets/images/photos/photos-1.png",
    //       };
    //       localStorage.setItem("user", JSON.stringify(this.user));
    //     }
    //     return response;
    //   } catch (error) {
    //     console.error("Error fetching current user:", error);
    //     return this.user;
    //   }
    // },
  },
});
