import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/app.css";
import { createPinia } from "pinia";
import { useStore } from "@/store";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.provide("pinia", pinia);

const store = useStore();
store.loadFromLocalStorage();

app.use(router).mount("#app");
app.config.globalProperties.$app = app;
app.unmount = () => {
  store.saveToLocalStorage();
  app.config.globalProperties.$app.unmount();
};
