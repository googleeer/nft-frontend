import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { resetStorePlugin } from "@/store/plugins/reset";
import i18n from "./utils/i18n";
import { clickOutside } from "@/utils/clickOutside";
const pinia = createPinia();
pinia.use(resetStorePlugin);

createApp(App)
  .use(router)
  .use(pinia)
  .use(i18n)
  .directive("click-outside", clickOutside)
  .mount("#app");
