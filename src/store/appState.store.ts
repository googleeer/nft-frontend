import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStateStore = defineStore("appState", () => {
  const preloader = ref(true);
  const setPreloaderValue = (value: boolean) => (preloader.value = value);

  const verifiedPhone = ref("");
  const setVerifiedPhone = (phone: string) => (verifiedPhone.value = phone);

  const isMobile = ref(false);
  const setIsMobile = (value: boolean) => (isMobile.value = value);

  const modalTeleport = ref("");
  const setIsModalTeleport = (value: string) => (modalTeleport.value = value);

  const showModal = ref(false);
  const setIsShowModal = (value: boolean) => (showModal.value = value);
  return {
    preloader,
    verifiedPhone,
    isMobile,
    modalTeleport,
    showModal,
    setPreloaderValue,
    setVerifiedPhone,
    setIsMobile,
    setIsModalTeleport,
    setIsShowModal,
  };
});
