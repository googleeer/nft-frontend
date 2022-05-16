import axios from "axios";
import router from "@/router";
import { JWT_TOKEN_KEY } from "@/constants/constants";

const instance = axios.create({
  baseURL: process.env.VUE_APP_WEEDAR_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
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
      localStorage.removeItem(JWT_TOKEN_KEY);
      router.currentRoute.value.meta.isAuth && (await router.push("/login"));
    }

    return Promise.reject(error);
  },
);

export default instance;
