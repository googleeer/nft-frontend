<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "TestView2",
  setup() {
    const error = ref("dfghjkl");
    const handleMotion = (e: any) => {
      console.log(e);
      error.value = JSON.stringify({
        alpha: e.alpha,
        beta: e.beta,
        gamma: e.beta,
        acceleration: e.acceleration,
        accelerationIncludingGravity: e.accelerationIncludingGravity,
        rotationRate: e.rotationRate,
      });
    };
    try {
      window.addEventListener("devicemotion", handleMotion);
      window.addEventListener("deviceorientation", handleMotion);
    } catch (e) {
      error.value = JSON.stringify(e);
      console.log(e);
    }
    return { error };
  },
});
</script>

<template>
  <div>TEst2</div>
  <div>{{ error }}</div>
</template>

<style lang="scss" scoped></style>
