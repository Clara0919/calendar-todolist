import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VCalendar from "v-calendar";

const app = createApp(App);

app.use(store).use(router).use(VCalendar, {}).mount("#app");
