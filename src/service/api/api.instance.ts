import axios from "axios";
import router from "@/router";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/constants";
import { postRefreshToken } from "@/service/auth/auth.service";

const instance = axios.create({
  baseURL: process.env.VUE_APP_WEEDAR_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  token &&
    (config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    });
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response.status === 401) {
      const originalRequest = error.config;
      const oldRefreshToken = localStorage.getItem(REFRESH_TOKEN) || "";
      try {
        const { accessToken, refreshToken } = await postRefreshToken(
          oldRefreshToken,
        );

        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);

        return instance({
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } catch (e) {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        await router.push("/login");
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
