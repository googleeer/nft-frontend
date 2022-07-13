import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Collection } from "@/service/collections/collections.type";

export const useCollectionsStore = defineStore("collectionStore", () => {
  const collections = ref<Collection[]>([]);
  const setCollections = (value: Collection[]) => (collections.value = value);

  const collectionsButtons = computed(() =>
    collections.value.map(({ id }) => id),
  );

  return {
    setCollections,
    collections,
    collectionsButtons,
  };
});
