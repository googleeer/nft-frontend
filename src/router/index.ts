import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { JWT_TOKEN_KEY } from "@/constans/constans";
import { getCurrentUser } from "@/service/user/user.service";
import { useAppStateStore } from "@/store/appState.store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/test",
    name: "test",
    component: () =>
      import(/* webpackChunkName: "sdf" */ "../views/TestView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/login/verify",
    name: "verifyLogin",
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
