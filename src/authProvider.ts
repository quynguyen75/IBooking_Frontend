import { AuthProvider } from "@pankod/refine-core";
import { AuthHelper } from "@pankod/refine-strapi-v4";
import axios from "axios";

const strapiAuthProvider = (apiUrl: string) => {
  const axiosInstance = axios.create();

  const TOKEN_KEY = "refine-auth";
  const strapiAuthHelper = AuthHelper(apiUrl);

  const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
      const { data, status } = await strapiAuthHelper.login(username, password);
      if (status === 200) {
        const { data: userData, status } = await strapiAuthHelper.me(data.jwt);

        if (!(status === 200)) {
          return Promise.reject();
        }

        if (userData.role.name !== "Admin") {
          return Promise.reject();
        }

        localStorage.setItem(TOKEN_KEY, data.jwt);

        // set header axios instance
        axiosInstance.defaults.headers = {
          Authorization: `Bearer ${data.jwt}`,
        };

        return Promise.resolve();
      }
      return Promise.reject();
    },
    logout: () => {
      localStorage.removeItem(TOKEN_KEY);
      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        axiosInstance.defaults.headers = {
          Authorization: `Bearer ${token}`,
        };
        return Promise.resolve();
      }

      return Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        return Promise.reject();
      }

      const { data, status } = await strapiAuthHelper.me(token);
      if (status === 200) {
        const { id, username, email, role } = data;

        return Promise.resolve({
          id,
          username,
          email,
        });
      }

      return Promise.reject();
    },
  };

  return {
    authProvider,
    axiosInstance,
  };
};

export default strapiAuthProvider;
