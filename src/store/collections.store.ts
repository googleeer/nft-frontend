import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { CollectionWithDrops } from "@/service/collections/collections.type";

export const useCollectionsStore = defineStore("collectionStore", () => {
  const collections = ref<CollectionWithDrops[]>([]);
  const setCollections = (value: CollectionWithDrops[]) =>
    (collections.value = value);

  const collectionsButtons = computed(() =>
    collections.value.map(({ id }) => id),
  );

  return {
    setCollections,
    collections,
    collectionsButtons,
  };
});
