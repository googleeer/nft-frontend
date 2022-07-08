import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { JWT_TOKEN_KEY } from "@/constants/constants";
import { getCurrentUser } from "@/service/user/user.service";
import { useAppStateStore } from "@/store/appState.store";
import { ROUTES } from "@/constants/routes.constants";

declare module "vue-router" {
  interface RouteMeta {
    isAuth?: boolean;
    layout?: string;
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    ...ROUTES.HOME,
    component: HomeView,
    meta: {
      isAuth: true,
      layout: "base",
    },
  },
  {
    ...ROUTES.MY_NFTS,
    component: () =>
      import(/* webpackChunkName: "myNft" */ "../views/MyNftsView.vue"),
    meta: {
      isAuth: true,
      layout: "base",
    },
  },
  {
    ...ROUTES.MY_NFT,
    component: () =>
      import(/* webpackChunkName: "myNft" */ "../views/MyNftView.vue"),
    meta: {
      isAuth: true,
      layout: "base",
    },
  },
  {
    ...ROUTES.COLLECTIONS,
    component: () =>
      import(
        /* webpackChunkName: "collections" */ "../views/CollectionsView.vue"
      ),
    meta: {
      isAuth: true,
      layout: "base",
    },
  },
  {
    ...ROUTES.COLLECTION,
    component: () =>
      import(
        /* webpackChunkName: "collection" */ "../views/CollectionView.vue"
      ),
    meta: {
      isAuth: true,
      layout: "base",
    },
  },
  {
    ...ROUTES.DROP,
    component: () =>
      import(/* webpackChunkName: "drop" */ "../views/DropView.vue"),
    meta: {
      isAuth: true,
      layout: "base",
    },
  },
  {
    ...ROUTES.MINT,
    component: () =>
      import(/* webpackChunkName: "mint" */ "../views/MintDropView.vue"),
    meta: {
      isAuth: true,
      layout: "base",
    },
  },
  {
    ...ROUTES.DROPS,
    component: () =>
      import(/* webpackChunkName: "drops" */ "../views/DropsView.vue"),
    meta: {
      isAuth: true,
      layout: "base",
    },
  },
  {
    ...ROUTES.PERKS,
    component: () =>
      import(/* webpackChunkName: "perks" */ "../views/PerksView.vue"),
    meta: {
      isAuth: true,
      layout: "base",
    },
  },
  {
    ...ROUTES.PERK,
    component: () =>
      import(/* webpackChunkName: "perks" */ "../views/PerkView.vue"),
    meta: {
      isAuth: true,
      layout: "base",
    },
  },
  {
    ...ROUTES.USER_SETTINGS,
    component: () =>
      import(
        /* webpackChunkName: "userSettings" */ "../views/UserSettingsView.vue"
      ),
    meta: {
      isAuth: true,
      layout: "base",
    },
    children: [
      {
        ...ROUTES.USER_SETTINGS_WALLET,
        component: () =>
          import(
            /* webpackChunkName: "userSettingsWallet" */ "../views/userSettings/UserSettingsWalletView.vue"
          ),
      },
      {
        ...ROUTES.USER_SETTINGS_FAQ,
        component: () =>
          import(
            /* webpackChunkName: "userSettingsFaq" */ "../views/userSettings/UserSettingsFaqView.vue"
          ),
      },
      {
        ...ROUTES.USER_SETTINGS_REFERRAL,
        component: () =>
          import(
            /* webpackChunkName: "userSettingsReferral" */ "../views/userSettings/UserSettingsReferralView.vue"
          ),
      },
    ],
  },
  {
    path: "/test",
    name: "test",
    component: () =>
      import(/* webpackChunkName: "sdf" */ "../views/TestView.vue"),
  },
  {
    path: "/test2",
    name: "test2",
    component: () =>
      import(/* webpackChunkName: "sdf" */ "../views/TestView2.vue"),
  },
  {
    ...ROUTES.LOGIN,
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    ...ROUTES.LOGIN_VERIFY,
    component: () =>
      import(
        /* webpackChunkName: "verifyLogin" */ "../views/VerifyLoginView.vue"
      ),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
});

router.beforeResolve((to, from, next) => {
  const appStateStore = useAppStateStore();
  if (!from.name && to.meta.isAuth) {
    const token = localStorage.getItem(JWT_TOKEN_KEY);
    if (token) {
      getCurrentUser()
        .then(async () => {
          next();
        })
        .finally(() => {
          appStateStore.setPreloaderValue(false);
        });
    } else {
      next("/login");
      appStateStore.setPreloaderValue(false);
    }
  } else {
    next();
    appStateStore.setPreloaderValue(false);
  }
});

export default router;
