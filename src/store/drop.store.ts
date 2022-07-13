import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Drop } from "@/service/drop/drop.type";

export const useDropsStore = defineStore("dropStore", () => {
  const drops = ref<Drop[]>([]);
  const setDrops = (value: Drop[]) => (drops.value = value);

  const dropsButtons = computed(() => drops.value.map(({ id }) => id));

  return {
    setDrops,
    drops,
    dropsButtons,
  };
});
