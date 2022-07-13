<script lang="ts">
import { defineComponent } from "vue";
import { useAppStateStore } from "@/store/appState.store";
import { getCollections } from "@/service/collections/collection.service";
import { useRouter } from "vue-router";
import { ROUTES } from "@/constants/routes.constants";
export default defineComponent({
  name: "CollectionsView",
  setup() {
    const appState = useAppStateStore();
    appState.setPreloaderValue(true);
    const router = useRouter();
    getCollections()
      .then(async (data) => {
        await router.push({
          name: ROUTES.COLLECTION.name,
          params: {
            id: data[0].id,
          },
        });
      })
      .finally(() => appState.setPreloaderValue(false));
    return {};
  },
});
</script>

<template>
  <div></div>
</template>
