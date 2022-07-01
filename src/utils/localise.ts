import { computed, Ref } from "vue";
export const getLocalisingByKey =
  <T>(locale: Ref<string>) =>
  (item: T, key: string) =>
    computed(
      () => item[(locale.value === "es" ? key + "_es" : key) as keyof T],
    );
