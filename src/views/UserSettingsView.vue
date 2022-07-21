<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import SettingsLink from "@/components/common/SettingsLink.vue";
import { ROUTES } from "@/constants/routes.constants";
import SettingsItem from "@/components/common/SettingsItem.vue";
import SettingsItemArrow from "@/components/common/SettingsItemArrow.vue";
import { logOut } from "@/service/auth/auth.service";
import { useRouter, useRoute } from "vue-router";
import { useAppStateStore } from "@/store/appState.store";
import { storeToRefs } from "pinia";
import SettingsCheckbox from "@/components/common/SettingsCheckbox.vue";
import MenuUserProfile from "@/components/baseLayout/MenuUserProfile.vue";
import { useUserStore } from "@/store/user.store";

export default defineComponent({
  name: "UserSettingsView",
  components: {
    MenuUserProfile,
    SettingsCheckbox,
    SettingsItemArrow,
    SettingsItem,
    SettingsLink,
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const route = useRoute();
    const appState = useAppStateStore();
    const userState = useUserStore();
    const { isMobile } = storeToRefs(appState);
    const { user } = storeToRefs(userState);
    const checkbox = ref(false);
    const onLogOut = () => {
      logOut();
      router.push(ROUTES.LOGIN.path);
    };
    const inactiveRoute = (targetRoute: string) => {
      console.log(router.currentRoute.value.name, targetRoute);
      if (targetRoute === router.currentRoute.value.name) {
        router.push(ROUTES.USER_SETTINGS);
      }
    };
    return {
      t,
      ROUTES,
      isMobile,
      user,
      checkbox,
      onLogOut,
      route,
      router,
      inactiveRoute,
    };
  },
});
</script>

<template>
  <div class="settings flex direction-column fullFlex">
    <div class="flex">
      <nav
        class="settings__menu"
        v-if="
          route.name === ROUTES.USER_SETTINGS.name ||
          (route.name !== ROUTES.USER_SETTINGS.name && !isMobile)
        "
      >
        <h1 class="settings__title">
          {{ t("profile.settings") }}
        </h1>
        <MenuUserProfile v-if="isMobile" type="settings" :user="user" />
        <div class="settings__menu__item--wrap">
          <SettingsLink
            text="profile.myWallet"
            icon="wallet.svg"
            :to="{ name: ROUTES.USER_SETTINGS_WALLET.name }"
            class="settings__menu__item"
            @click="inactiveRoute(ROUTES.USER_SETTINGS_WALLET.name)"
          />
          <SettingsLink
            text="profile.faq"
            icon="faq.svg"
            :to="{ name: ROUTES.USER_SETTINGS_FAQ.name }"
            class="settings__menu__item"
            @click="inactiveRoute(ROUTES.USER_SETTINGS_FAQ.name)"
          />
          <SettingsLink
            text="profile.referral"
            icon="referral.svg"
            :to="{ name: ROUTES.USER_SETTINGS_REFERRAL.name }"
            class="settings__menu__item"
            @click="inactiveRoute(ROUTES.USER_SETTINGS_REFERRAL.name)"
          />
          <SettingsCheckbox
            text="profile.notification"
            icon="notify.svg"
            v-model="checkbox"
            class="settings__menu__item"
          />
          <SettingsItem
            v-if="isMobile"
            :with-out-border="true"
            @click="onLogOut"
            text="profile.logOut"
            icon="logOut.svg"
            class="pointer"
          >
            <SettingsItemArrow />
          </SettingsItem>
        </div>
      </nav>
      <div
        v-if="route.path !== ROUTES.USER_SETTINGS.path"
        class="settings-content"
      >
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings-content {
  width: 100%;
  padding-left: 80px;
  padding-right: 15px;
  padding-top: 94px;
  @media screen and (max-width: 768px) {
    padding-left: 23px;
    padding-right: 10px;
    padding-top: 0;
    margin: 0 auto;
  }
  @media screen and (max-width: 350px) {
    padding-left: 10px;
  }
}
.settings {
  background-color: var(--color-black);
  padding: 133px 56px 0 382px;

  @media screen and (max-width: 768px) {
    padding: 93px 0 0;
  }

  &__menu {
    width: 100%;
    max-width: 326px;
    position: fixed;
    z-index: 1;
    left: 56px;
    top: 133px;

    @media screen and (max-width: 768px) {
      max-width: 375px;
      margin: 0 auto;
      padding-top: 99px;
      padding-bottom: 14px;
      position: static;
    }

    &__item {
      margin-bottom: 14px;

      &--wrap {
        @media screen and (max-width: 768px) {
          position: relative;
          z-index: 1;
          background-color: var(--color-black);
          border-top-right-radius: 34px;
          border-top-left-radius: 34px;
        }
      }
    }
  }

  &__title {
    font-weight: 600;
    font-size: 48px;
    line-height: 130%;
    color: var(--color-white);
    margin-bottom: 35px;

    @media screen and (max-width: 768px) {
      display: none;
    }
  }
}
</style>
