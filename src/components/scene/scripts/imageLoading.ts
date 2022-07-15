import { computed, ref } from "vue";

export const useImageLoading = (images: string[]) => {
  const count = computed(() => images.filter((_) => _).length);
  const loadedImagesCount = ref(0);
  const isLoadedAllImages = ref(false);

  const asyncPreloadImage = (url: string) =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedImagesCount.value++;
        resolve(true);
      };
    });

  console.time("qqq");

  Promise.all(images.filter((_) => _).map(asyncPreloadImage)).then(
    () => (isLoadedAllImages.value = true),
  );

  // watch(loadedImagesCount, (value) => {
  //   if (value === count.value) {
  //     setTimeout(() => {
  //       isLoadedAllImages.value = true;
  //     }, 420);
  //   }
  // });

  return {
    count,
    loadedImagesCount,
    isLoadedAllImages,
  };
};
