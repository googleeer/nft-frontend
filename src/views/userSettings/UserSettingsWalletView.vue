<script lang="ts">
import { defineComponent } from "vue";
import SettingsLink from "@/components/common/SettingsLink.vue";
import { ROUTES } from "@/constants/routes.constants";
import { useI18n } from "vue-i18n";
import { useAppStateStore } from "@/store/appState.store";
import MetamaskModal from "@/components/modal/MetamaskModal.vue";

export default defineComponent({
  name: "UserSettingsWallet",
  components: { MetamaskModal, SettingsLink },
  setup() {
    const { t } = useI18n();
    const appStateStore = useAppStateStore();
    const changeModalState = (value: boolean) =>
      appStateStore.setIsShowModal(value);

    const handleModalClick = (type: string) => {
      if (type === "close") {
        changeModalState(false);
      }
    };
    return { ROUTES, t, changeModalState, handleModalClick };
  },
});
</script>

<template>
  <div class="wrapper">
    <h1 class="title">{{ t("settings.wallet.title") }}</h1>
    <p class="desc">{{ t("settings.wallet.desc") }}</p>
    <SettingsLink
      text="settings.wallet.items.metamask"
      icon="metamask.svg"
      :border-radius="'top'"
      class="wallet__item"
      @click="changeModalState(true)"
    />
    <SettingsLink
      text="settings.wallet.items.walletConnect"
      icon="walletconnect.svg"
      :border-radius="'none'"
      class="wallet__item"
    />
    <SettingsLink
      text="settings.wallet.items.coinbaseWallet"
      icon="Coinbase.svg"
      :border-radius="'bottom'"
      class="wallet__item"
    />
    <MetamaskModal @btnClick="handleModalClick"></MetamaskModal>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  max-width: 529px;

  .wallet__item {
    max-width: 529px;
    @media screen and (max-width: 768px) {
      margin: 0 auto;
    }
  }

  .wallet__item:not(:last-child) {
    ::v-deep(.item__content) {
      position: relative;
      &::before {
        position: absolute;
        content: "";
        bottom: -25px;
        width: 100%;
        z-index: 0;
        border: 1px dashed #1e1e1e;
      }
    }
  }

  .exact-active {
    ::v-deep(.item) {
      border: 1px solid var(--color-eerie);
    }
    ::v-deep(.item__icon) {
      opacity: 0.5;
    }
  }
}
.title {
  font-weight: 600;
  font-size: 32px;
  line-height: 130%;
}
.desc {
  font-size: 20px;
  line-height: 150%;
  padding-top: 8px;
  padding-bottom: 27px;
  @media screen and (max-width: 768px) {
    padding-top: 14px;
    padding-bottom: 29px;
  }
}
</style>
