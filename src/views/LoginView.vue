<script>
import { defineComponent, ref } from "vue";
import BaseButton from "@/components/form/BaseButton";
import PhoneInput from "@/components/form/PhoneInput";
import { getCodeByPhone } from "@/service/auth/auth.service";
import { useRouter } from "vue-router";
import { useAppStateStore } from "@/store/appState.store";
import AuthLayout from "@/layouts/AuthLayout";

export default defineComponent({
  name: "LoginView",
  components: { AuthLayout, PhoneInput, BaseButton },
  setup() {
    const phoneInputRef = ref(null);
    const phoneValue = ref("");
    const phoneErrorText = ref("");
    const isLoading = ref(false);
    const router = useRouter();
    const appState = useAppStateStore();

    const getCode = async () => {
      if (isLoading.value) return;
      phoneInputRef.value.validate();
      if (phoneErrorText.value.length) return;
      isLoading.value = true;
      try {
        const phone = `+${phoneValue.value
          .split("")
          .filter((_) => !!_.trim())
          .join("")}`;
        await getCodeByPhone(phone);
        appState.setVerifiedPhone(phone);
        await router.push({ name: "verifyLogin" });
      } catch (e) {
        phoneErrorText.value = e.response.data;
      } finally {
        isLoading.value = false;
      }
    };

    return {
      phoneValue,
      phoneErrorText,
      getCode,
      isLoading,
      phoneInputRef,
    };
  },
});
</script>

<template>
  <AuthLayout
    title="Welcome!"
    text="Insert your phone number to get the verification code."
  >
    <template #form>
      <form
        class="login flex direction-column align-center form flex-grow-1 justify-between"
        @submit.prevent="getCode"
      >
        <PhoneInput
          ref="phoneInputRef"
          v-model="phoneValue"
          v-model:error-text="phoneErrorText"
        ></PhoneInput>
        <BaseButton
          type="submit"
          :disabled="isLoading"
          button-text="Get Code"
        ></BaseButton>
      </form>
    </template>
  </AuthLayout>
</template>

<style lang="scss" scoped>
.form {
  padding-bottom: 126px;
}
</style>
