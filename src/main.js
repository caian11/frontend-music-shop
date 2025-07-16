import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import ArgonDashboard from "./argon-dashboard";

import Select from "vue3-select";
import "vue3-select/dist/vue3-select.css";

const appInstance = createApp(App);

appInstance.component("v-select", Select);

appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);

appInstance.mount("#app");
