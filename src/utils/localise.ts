import { computed, Ref } from "vue";
import { ElementDescription } from "@/service/commonTypes/commonTypes";

export type LocalisingKey = keyof ElementDescription;

export const getLocalisingByKey =
  <T>(locale: Ref<string>) =>
  (item: T, key: string) =>
    computed(() => item[(locale.value === "es" ? key + "_es" : key) as keyof T])
      .value;
