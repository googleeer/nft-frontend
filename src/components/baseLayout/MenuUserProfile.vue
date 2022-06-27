<script lang="ts">
import { defineComponent, PropType } from "vue";
import { User } from "@/service/user/user.types";
import UserAvatar from "@/components/baseLayout/UserAvatar.vue";
import SettingsLink from "@/components/common/SettingsLink.vue";
import SettingsItem from "@/components/common/SettingsItem.vue";
import SettingsItemArrow from "@/components/common/SettingsItemArrow.vue";
import { ROUTES } from "@/constants/routes.constants";
import { logOut } from "@/service/auth/auth.service";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MenuUserProfile",
  emits: ["clickAvatar", "update:isOpen"],
  components: {
    SettingsItemArrow,
    SettingsItem,
    SettingsLink,
    UserAvatar,
  },
  props: {
    user: Object as PropType<User>,
    type: String as PropType<"menu" | "settings" | "desktop">,
    isOpen: Boolean,
  },
  setup(props) {
    const isDesktop = props.type === "desktop";
    const isSettings = props.type === "settings";
    const router = useRouter();
    const onLogOut = () => {
      logOut();
      router.push(ROUTES.LOGIN.path);
    };
    return {
      isDesktop,
      isSettings,
      ROUTES,
      onLogOut,
    };
  },
});
</script>

<template>
  <div
    class="profile--wrap"
    :class="{ desktop: isDesktop }"
    v-click-outside:[300]="() => $emit('update:isOpen', false)"
  >
    <div
      class="profile flex align-center"
      :class="{ 'row-reverse': isDesktop, settings: isSettings }"
    >
      <UserAvatar
        @click="$emit('clickAvatar')"
        class="profile__avatar"
        :class="{ isDesktop }"
      />
      <div :class="{ 'flex direction-column align-center': isSettings }">
        <p class="profile__name" :class="{ isDesktop }">
          {{ user.name || "Empty" }}
        </p>
        <p class="profile__phone flex align-center">
          <svg
            class="profile__phone__icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.76085 1.66187C2.8315 1.59123 2.86682 1.5559 2.89794 1.52731C3.6631 0.82423 4.83921 0.82423 5.60436 1.52731C5.63548 1.5559 5.67081 1.59123 5.74145 1.66187L7.19965 3.12007C8.0017 3.92212 8.23109 5.13336 7.77785 6.17314C7.32461 7.21293 7.554 8.42416 8.35605 9.22622L10.7529 11.623C11.5549 12.4251 12.7661 12.6545 13.8059 12.2012C14.8457 11.748 16.057 11.9774 16.859 12.7794L18.3172 14.2376C18.3878 14.3083 18.4232 14.3436 18.4518 14.3747C19.1548 15.1399 19.1548 16.316 18.4518 17.0811C18.4232 17.1123 18.3878 17.1476 18.3172 17.2182L17.4309 18.1046C16.7091 18.8264 15.6685 19.1294 14.6721 18.9079C7.88248 17.3991 2.57995 12.0966 1.07115 5.307C0.849715 4.31054 1.15272 3.27001 1.87451 2.54821L2.76085 1.66187Z"
              stroke="black"
              stroke-width="1.5"
            />
          </svg>
          {{ user.phone }}
        </p>
      </div>
      <RouterLink
        class="profile__link flex flexCenter"
        v-if="type === 'menu'"
        :to="ROUTES.USER_SETTINGS.path"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 7L11.763 8.74731C13.1689 10.1408 13.8719 10.8375 13.9801 11.6867C14.0066 11.8947 14.0066 12.1053 13.9801 12.3133C13.8719 13.1625 13.1689 13.8592 11.763 15.2527L10 17"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </RouterLink>
    </div>
    <div v-if="isDesktop" class="desktopMenu">
      <SettingsLink
        :with-out-border="true"
        :to="ROUTES.USER_SETTINGS.path"
        icon="settings.svg"
        text="profile.settings"
        class="desktopMenu__settingsLink"
      />
      <SettingsItem
        @click="onLogOut"
        :with-out-border="true"
        text="profile.logOut"
        icon="logOut.svg"
        class="desktopMenu__logOutLink pointer"
      >
        <SettingsItemArrow />
      </SettingsItem>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  position: relative;
  z-index: 0;
  padding: 16px 20px 17px;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: -73px;
    z-index: -1;
    background-image: url("~@/assets/images/menuUserProfile.png");
    background-size: cover;
    border-radius: 33px;
  }

  &.settings {
    flex-direction: column;
    padding-top: 0;
    padding-bottom: 22px;

    .profile__avatar {
      width: 104px;
      height: 104px;
      margin-top: -52px;
      margin-bottom: 14px;
      margin-right: 0;
    }
  }

  &--wrap {
    &.desktop {
      position: fixed;
      top: 15px;
      right: 35px;
      width: 292px;
    }
  }

  &__link {
    background: var(--color-black);
    border-radius: 16px;
    width: 48px;
    height: 48px;
    margin-left: auto;
  }

  &__name {
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    color: var(--color-black);
    margin-bottom: 6px;

    &.isDesktop {
      text-align: right;
    }
  }

  &__phone {
    font-family: "CoreSansC", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: var(--color-black);
    &__icon {
      margin-right: 7px;
      width: 18px;
      height: 18px;
    }
  }

  &__avatar {
    width: 64px;
    margin-right: 13px;

    &.isDesktop {
      margin-right: 0;
      margin-left: 18px;
    }
  }
}

.desktopMenu {
  position: relative;
  z-index: 1;
  background: radial-gradient(
    113.12% 113.12% at 50.52% 50.52%,
    #292929 0%,
    #000000 100%
  );
  border: 1px solid var(--color-eerie);
  border-radius: 24px;

  &__settingsLink {
    margin-bottom: 19px;
  }

  &__logOutLink {
    border-bottom-right-radius: 24px;
    border-bottom-left-radius: 24px;
  }
}
</style>
