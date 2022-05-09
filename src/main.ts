import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { resetStorePlugin } from "@/store/plugins/reset";

const pinia = createPinia();
pinia.use(resetStorePlugin);

createApp(App).use(router).use(pinia).mount("#app");
