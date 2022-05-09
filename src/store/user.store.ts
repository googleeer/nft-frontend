import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { User } from "@/service/user/user.types";

export const useUserStore = defineStore("userStore", () => {
  const user = reactive<User>({
    email: "",
    id: 0,
    phone: "",
  });
  const setUser = ({ phone, email, id }: User) => {
    user.phone = phone;
    user.id = id;
    user.email = email;
  };

  const userOrders = ref([]);
  const setUserOrders = (value: []) => (userOrders.value = value);

  return {
    user,
    userOrders,
    setUser,
    setUserOrders,
  };
});
