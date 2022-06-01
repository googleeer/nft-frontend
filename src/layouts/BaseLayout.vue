<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import BaseBurger from "@/components/baseLayout/BaseBurger.vue";
import { useI18n } from "vue-i18n";
import MainMenu from "@/components/baseLayout/MainMenu.vue";
import LocaleSwitcher from "@/components/baseLayout/LocaleSwitcher.vue";
import { useAppStateStore } from "@/store/appState.store";
import { storeToRefs } from "pinia";
import UserAvatar from "@/components/baseLayout/UserAvatar.vue";
import MenuUserProfile from "@/components/baseLayout/MenuUserProfile.vue";
import { useUserStore } from "@/store/user.store";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "BaseLayout",
  components: {
    MenuUserProfile,
    UserAvatar,
    LocaleSwitcher,
    MainMenu,
    BaseBurger,
  },
  setup() {
    const { t } = useI18n();
    const appStore = useAppStateStore();
    const userStore = useUserStore();
    const route = useRoute();
    const { isMobile } = storeToRefs(appStore);
    const { user } = storeToRefs(userStore);

    const isOpenMenu = ref(false);
    const isOpenUserMenu = ref(false);

    watch(
      () => route.name,
      () => {
        isOpenMenu.value && (isOpenMenu.value = false);
        isOpenUserMenu.value && (isOpenUserMenu.value = false);
      },
    );

    return { t, isOpenMenu, isMobile, user, isOpenUserMenu };
  },
});
</script>

<template>
  <div class="layout--wrap flex direction-column flex-grow-1">
    <header
      class="layout__header flex align-center justify-between justify-center-sm"
    >
      <BaseBurger v-model:is-open="isOpenMenu" />
      <span class="layout__empty"></span>
      <img
        src="../assets/images/sm_logo.png"
        alt="WEEDAR"
        class="layout__logo"
      />
      <div class="flex layout__header__right">
        <LocaleSwitcher v-if="!isMobile || (isMobile && isOpenMenu)" />
        <UserAvatar
          class="avatar"
          v-if="!isMobile"
          @click="isOpenUserMenu = !isOpenUserMenu"
        />
        <transition name="fade">
          <MenuUserProfile
            @clickAvatar="isOpenUserMenu = !isOpenUserMenu"
            v-if="isOpenUserMenu && !isMobile"
            :user="user"
            type="desktop"
            v-model:is-open="isOpenUserMenu"
          />
        </transition>
      </div>
    </header>
    <MainMenu v-model:is-open="isOpenMenu" />
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  &__logo {
    position: fixed;
    top: 45px;
    left: 50%;
    transform: translateX(-50%);
    z-index: var(--z-index-header-logo);

    @media screen and (max-width: 768px) {
      height: 15px;
      object-fit: contain;
    }
  }

  &__header {
    &__right {
      position: fixed;
      right: 56px;
      top: 55px;

      @media screen and (max-width: 768px) {
        position: static;
      }
    }
  }

  &--wrap {
    position: relative;
  }

  &__empty {
    width: 24px;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 22px;
  margin-left: 39px;
}
</style>
