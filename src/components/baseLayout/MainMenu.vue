<script lang="ts">
import { defineComponent } from "vue";
import { ROUTES } from "@/constants/routes.constants";
import { useI18n } from "vue-i18n";
import { useAppStateStore } from "@/store/appState.store";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/user.store";
import MenuUserProfile from "@/components/baseLayout/MenuUserProfile.vue";

export default defineComponent({
  name: "MainMenu",
  components: { MenuUserProfile },
  props: {
    isOpen: Boolean,
  },
  emits: ["update:isOpen"],
  setup() {
    const { t } = useI18n();
    const appStore = useAppStateStore();
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);
    const { isMobile } = storeToRefs(appStore);
    const links = [
      {
        to: ROUTES.MY_NFTS.path,
        name: "myNft",
      },
      {
        to: ROUTES.COLLECTIONS.path,
        name: "collections",
      },
      {
        to: ROUTES.DROPS.path,
        name: "drops",
      },
      {
        to: ROUTES.PERKS.path,
        name: "perks",
      },
    ];

    const nftCount = 5;

    return {
      t,
      isMobile,
      links,
      nftCount,
      user,
    };
  },
});
</script>

<template>
  <nav class="mainMenu--wrap" :class="{ active: isOpen }">
    <MenuUserProfile v-if="isMobile" :user="user" type="menu" />
    <ul class="mainMenu">
      <li class="mainMenu__item" v-for="link in links" :key="link.name">
        <router-link class="mainMenu__item__link" :to="link.to">
          {{ t(`menu.${link.name}`) }}
          <span
            v-if="link.name === 'myNft' && !!nftCount"
            class="nftCount flex flexCenter"
          >
            {{ nftCount }}
          </span>
        </router-link>
      </li>
    </ul>
  </nav>
  <transition name="fade">
    <div
      v-if="isOpen && !isMobile"
      class="mainMenu__blur"
      @click="$emit('update:isOpen', false)"
    ></div>
  </transition>
</template>

<style lang="scss" scoped>
.mainMenu {
  padding-top: 91px;
  padding-left: 24px;
  padding-right: 31px;
  position: relative;
  z-index: 1;
  background-color: var(--color-black);

  @media screen and (max-width: 768px) {
    padding-top: 41px;
    padding-left: 20px;
    padding-right: 28px;
    border-top-left-radius: 34px;
    border-top-right-radius: 34px;
  }

  &__item {
    &:not(:last-child) {
      margin-bottom: 12px;
      @media screen and (max-width: 768px) {
        margin-bottom: 28px;
      }
    }
    &__link {
      position: relative;
      display: block;
      font-weight: 600;
      font-size: 48px;
      line-height: 130%;
      color: var(--color-white);
      text-decoration: none;

      &:hover,
      &.exact-active {
        text-decoration: underline;
      }

      @media screen and (max-width: 768px) {
        font-size: 32px;
      }
    }
  }

  &__blur {
    position: fixed;
    inset: 0;
    left: 382px;
    z-index: var(--z-idx-main-menu-blur);
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(27.1828px);
  }

  &--wrap {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 382px;
    z-index: var(--z-idx-main-menu);
    background: var(--color-black);
    transition: all 0.3s ease;

    @media screen and (max-width: 768px) {
      width: 100%;
      padding-top: 94px;
    }

    &:not(.active) {
      transform: translateX(-100%);
    }
  }
}

.nftCount {
  pointer-events: none;
  position: absolute;
  top: 50%;
  right: -7px;
  transform: translateY(-50%);
  width: 41px;
  height: 41px;
  background-image: url("~@/assets/images/nftCount.png");
  background-size: cover;
  font-size: 18px;
  line-height: 18px;
  color: var(--color-black);
  padding-top: 5px;

  @media screen and (max-width: 768px) {
    width: 35px;
    height: 35px;
    right: 0;
    top: 0;
    transform: translateY(0);
  }
}
</style>
