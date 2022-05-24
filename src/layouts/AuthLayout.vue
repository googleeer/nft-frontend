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
  <div class="wrapper flex justify-center align-center">
    <div class="flex direction-column container align-center">
      <img class="logo" src="../assets/images/logo.svg" alt="WEEDAR" />
      <div class="container__form flex direction-column flex-grow-1">
        <h1 class="container__form--title">{{ title }}</h1>
        <p v-if="text" class="container__form--text">{{ text }}</p>
        <slot name="text"></slot>
        <slot name="form" class="container__form--btn"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
}
::v-slotted(form) {
  justify-content: flex-start;
  @media screen and (max-width: 768px) {
    justify-content: space-between;
  }
}
.container {
  position: relative;
  width: 100%;
  //background-image: url("~@/assets/images/bg-logo.svg");
  //background-repeat: no-repeat;
  padding-top: 133px;
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
  background-position: center center;
  &__form {
    max-width: 312px;
    &--title {
      font-size: 48px;
      font-weight: 600;
      padding-bottom: 38px;
      line-height: 130%;
      @media screen and (max-width: 768px) {
        font-size: 32px;
        line-height: 130%;
        margin-bottom: 15px;
      }
    }
    &--text {
      line-height: 150%;
      font-size: 20px;
      padding-bottom: 38px;
      @media screen and (max-width: 768px) {
        font-size: 20px;
        line-height: 150%;
        margin-bottom: 30px;
      }
    }
  }
  &--btn {
    max-width: 20px;
  }
  ::v-deep(.button) {
    margin-top: 116px;
  }
}
.logo {
  width: 104px;
  margin-bottom: 77px;
  @media screen and (max-width: 768px) {
    width: 70px;
    margin-bottom: 60px;
  }
}
.wrapper::before {
  content: "";
  position: absolute;
  background-image: url("~@/assets/images/bg-logo.svg");
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-position: center;
  @media screen and (max-width: 768px) {
    content: none;
  }
}
//.text {
//  font-size: 20px;
//  line-height: 150%;
//  margin-bottom: 30px;
//}
</style>
