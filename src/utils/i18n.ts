import { createI18n } from "vue-i18n";
import en from "./translations/en.json";
import es from "./translations/es.json";
export default createI18n({
  locale: "en",
  legacy: false,
  fallbackLocale: "en",
  messages: {
    en,
    es,
  },
});
