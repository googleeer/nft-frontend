import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStateStore = defineStore("appState", () => {
  const preloader = ref(true);
  const setPreloaderValue = (value: boolean) => (preloader.value = value);

  const verifiedPhone = ref("+380730629321");
  const setVerifiedPhone = (phone: string) => (verifiedPhone.value = phone);

  return {
    preloader,
    verifiedPhone,
    setPreloaderValue,
    setVerifiedPhone,
  };
});
