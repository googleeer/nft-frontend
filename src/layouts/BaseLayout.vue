<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import BaseBurger from "@/components/baseLayout/BaseBurger.vue";
import { useI18n } from "vue-i18n";
import MainMenu from "@/components/baseLayout/MainMenu.vue";
import LocaleSwitcher from "@/components/baseLayout/LocaleSwitcher.vue";
import { useAppStateStore } from "@/store/appState.store";
import { storeToRefs } from "pinia";
import UserAvatar from "@/components/baseLayout/UserAvatar.vue";
import MenuUserProfile from "@/components/baseLayout/MenuUserProfile.vue";
import { useUserStore } from "@/store/user.store";
import { useRoute, useRouter } from "vue-router";
import { ROUTES } from "@/constants/routes.constants";
import BasePreloader from "@/components/baseLayout/BasePreloader.vue";
export default defineComponent({
  name: "BaseLayout",
  components: {
    MenuUserProfile,
    UserAvatar,
    LocaleSwitcher,
    MainMenu,
    BaseBurger,
    BasePreloader,
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
    const bgRightHeader = computed(
      () => useRouter().currentRoute.value.meta.bgRightHeader,
    );
    const bgAllHeader = computed(
      () => useRouter().currentRoute.value.meta.bgAllHeader,
    );
    const mobHeader = computed(
      () => useRouter().currentRoute.value.meta.mobHeader,
    );
    const headerIndex = computed(
      () => useRouter().currentRoute.value.meta.bgAllHeader,
    );
    watch(
      () => route.name,
      () => {
        isOpenMenu.value && (isOpenMenu.value = false);
        isOpenUserMenu.value && (isOpenUserMenu.value = false);
      },
    );

    return {
      t,
      isOpenMenu,
      isMobile,
      user,
      isOpenUserMenu,
      ROUTES,
      bgRightHeader,
      bgAllHeader,
      headerIndex,
      mobHeader,
    };
  },
});
</script>

<template>
  <div class="layout--wrap flex direction-column flex-grow-1">
    <BasePreloader></BasePreloader>
    <header
      class="layout__header flex align-center justify-between justify-center-sm"
      :class="[
        { isRightBg: bgRightHeader && !isMobile },
        { isAllBg: bgAllHeader && !isMobile },
        { mobHeader: mobHeader && isMobile },
      ]"
    >
      <BaseBurger v-model:is-open="isOpenMenu" />
      <span class="layout__empty"></span>
      <router-link
        :to="{ name: ROUTES.COLLECTIONS.name }"
        :class="{ headerIndex }"
      >
        <img
          src="../assets/images/weedar.png"
          :alt="t('logo')"
          class="layout__logo"
        />
      </router-link>
      <div class="flex layout__header__right" :class="{ headerIndex }">
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
.mobHeader:before {
  content: "";
  position: fixed;
  width: 100%;
  right: 0;
  height: 110px;
  background-color: var(--color-black);
  z-index: var(--z-index-header-logo);
  inset: 0;
}
.isRightBg::before {
  content: "";
  position: fixed;
  width: 100%;
  max-width: 523px;
  right: 0;
  height: 110px;
  background-color: var(--color-black);
  z-index: var(--z-index-header-logo);
  right: 0;
  top: 0;
}
.isAllBg::before {
  content: "";
  position: fixed;
  width: 100%;
  right: 0;
  height: 110px;
  background-color: var(--color-black);
  z-index: var(--z-index-header-logo);
  inset: 0;
}
.layout {
  &__logo {
    width: 100%;
    max-width: 198px;
    position: fixed;
    top: 42px;
    left: 50%;
    transform: translateX(-50%);
    z-index: var(--z-index-header-logo);

    @media screen and (max-width: 768px) {
      width: 129px;
      height: 23px;
      object-fit: contain;
      top: 41px;
    }
  }

  &__header {
    position: relative;
    //&::before {
    //  content: "";
    //  position: fixed;
    //  width: 100%;
    //  height: 120px;
    //  background-color: rgba(25, 23, 23, 0.5);
    //  z-index: var(--z-index-header-logo);
    //  inset: 0;
    //}
    @media screen and (max-width: 768px) {
      //&::before {
      //  content: "";
      //  position: fixed;
      //  width: 100%;
      //  height: 90px;
      //  background-color: black;
      //  z-index: var(--z-index-header-logo);
      //  inset: 0;
      //}
    }
    &__right {
      position: fixed;
      right: 56px;
      top: 28px;
      @media screen and (min-width: 768px) {
        z-index: var(--z-index-header-logo);
      }

      @media screen and (max-width: 768px) {
        position: static;
      }
    }
    .headerIndex {
      @media screen and (min-width: 768px) {
        z-index: 6;
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
