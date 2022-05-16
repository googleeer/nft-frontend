<template>
  <div class="home" style="color: white">
    <pre>
      {{ userOrders }}
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAppStateStore } from "@/store/appState.store";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/user.store";

export default defineComponent({
  name: "HomeView",
  setup() {
    const appState = useAppStateStore();
    appState.setPreloaderValue(true);
    // getUserOrders().finally(() => appState.setPreloaderValue(false));

    const userStore = useUserStore();

    const { userOrders } = storeToRefs(userStore);

    return { userOrders };
  },
});
</script>
