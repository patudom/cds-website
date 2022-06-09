import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "@/plugins/vuetify";
import VueCookies from "vue-cookies";
import draggableDialogs from "./plugins/draggableDialogs";
import AppLayout from "@/layouts/AppLayout.vue";
import "@/assets/main.less";

Vue.component("app-layout", AppLayout);

Vue.use(VueCookies);
Vue.use(draggableDialogs);

import axios from "axios";
axios.defaults.withCredentials = true;

Vue.config.productionTip = false;
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
