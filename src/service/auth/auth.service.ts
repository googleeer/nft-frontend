import instance from "@/service/api/api.instance";
import { useUserStore } from "@/store/user.store";
import { JWT_TOKEN_KEY } from "@/constants/constants";

export const getCodeByPhone = async (phone: string) => {
  try {
    await instance.post("/auth/login/phone", {
      phone,
    });
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
    localStorage.setItem(JWT_TOKEN_KEY, user.data.accessToken);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const logOut = () => {
  localStorage.removeItem(JWT_TOKEN_KEY);
  const userStore = useUserStore();
  userStore.$reset();
};
