<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserAvatar",
  setup() {
    return {};
  },
});
</script>

<template>
  <img
    src="../../assets/images/avatar.svg"
    alt="avatar"
    class="avatar pointer"
  />
</template>

<style lang="scss" scoped>
.avatar {
  object-fit: cover;
}
</style>
