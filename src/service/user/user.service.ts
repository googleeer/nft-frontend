import instance from "@/service/api/api.instance";
import { useUserStore } from "@/store/user.store";

export const getUserOrders = async () => {
  try {
    const userState = useUserStore();
    const orders = await instance.get(`/order/by-nft`);
    userState.setUserOrders(orders.data);
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await instance.get("/user/current");
    const userStore = useUserStore();
    userStore.setUser(user.data);
  } catch (e) {
    return Promise.reject(e);
  }
};
