import instance from "@/service/api/api.instance";
import { useUserStore } from "@/store/user.store";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/constants";
import { getMintedDropsCount } from "@/service/drop/drop.service";
import { PostRefresh } from "@/service/auth/auth.type";

export const getCodeByPhone = async (phone: string) => {
  try {
    await instance.post("/auth/login/phone", {
      phone,
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
export const postRefreshToken = async (
  refreshToken: string,
): Promise<PostRefresh> => {
  try {
    const res = await instance.post("/auth/refresh-token", { refreshToken });
    return res.data;
  } catch (e) {
    return Promise.reject(e);
  }
};
export const verifyCodeByPhone = async (phone: string, code: string) => {
  try {
    const user = await instance.post("/auth/login/phone/check-code", {
      phone,
      code,
    });
    const userStore = useUserStore();
    userStore.setUser(user.data);
    localStorage.setItem(ACCESS_TOKEN, user.data.accessToken);
    localStorage.setItem(REFRESH_TOKEN, user.data.refreshToken);
    await getMintedDropsCount();
  } catch (e) {
    return Promise.reject(e);
  }
};

export const logOut = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  const userStore = useUserStore();
  userStore.$reset();
};
