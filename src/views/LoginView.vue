<script>
import { defineComponent, ref } from "vue";
import BaseButton from "@/components/form/BaseButton";
import PhoneInput from "@/components/form/PhoneInput";
import { getCodeByPhone } from "@/service/auth/auth.service";
import { useRouter } from "vue-router";
import { useAppStateStore } from "@/store/appState.store";
import AuthLayout from "@/layouts/AuthLayout";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "LoginView",
  components: { AuthLayout, PhoneInput, BaseButton },
  setup() {
    const { t } = useI18n();
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
      t,
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
  <AuthLayout :title="t('login.title')" :text="t('login.text')">
    <template #form>
      <form
        class="login flex direction-column align-center form flex-grow-1 justify-between-sm"
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
          :button-text="t('login.getCode')"
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
