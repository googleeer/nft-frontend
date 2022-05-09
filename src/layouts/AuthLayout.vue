<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AuthLayout",
  props: {
    title: String,
    text: String,
  },
  setup() {
    return {};
  },
});
</script>

<template>
  <div class="flex direction-column container align-center flex-grow-1">
    <img class="logo" src="../assets/images/logo.png" alt="WEEDAR" />
    <div class="container__form">
      <h1 class="title">{{ title }}</h1>
      <p v-if="text" class="text">{{ text }}</p>
      <slot name="text"></slot>
      <slot name="form"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding-top: 24px;
  padding-left: 15px;
  padding-right: 15px;
  text-align: left;

  &__form {
    max-width: 335px;
  }
}
.logo {
  width: 70px;
  margin-bottom: 60px;
}

.title {
  font-size: 32px;
  line-height: 130%;
  margin-bottom: 15px;
}

.text {
  font-size: 20px;
  line-height: 150%;
  margin-bottom: 30px;
}
</style>
