import { onBeforeUnmount, onMounted } from "vue";

export const useOverflowHiddenBody = () => {
  onMounted(() => document.body.classList.add("overflowHidden"));
  onBeforeUnmount(() => document.body.classList.remove("overflowHidden"));
};
