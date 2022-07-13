import { computed, ref, watch } from "vue";
import { SceneImagesProp } from "@/components/scene/sceneComponent.types";

export const useImageLoading = (
  images: SceneImagesProp,
  emit: (event: "toActive" | "loaded", ...args: any[]) => void,
) => {
  const count = computed(() => Object.values(images).filter((_) => _).length);
  const loadedImagesCount = ref(0);
  const isLoadedAllImages = ref(false);
  watch(loadedImagesCount, (value) => {
    if (value === count.value) {
      setTimeout(() => {
        isLoadedAllImages.value = true;
        emit("loaded");
      }, 420);
    }
  });

  return {
    count,
    loadedImagesCount,
    isLoadedAllImages,
  };
};
