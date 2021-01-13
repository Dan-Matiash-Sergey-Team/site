import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"
import YmapPlugin from "vue-yandex-maps"

Vue.config.productionTip = false;
const settings = {
  apiKey: '8984067c-7841-4a8a-aa3e-8d6920ceea02',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
}
Vue.use(YmapPlugin, settings)

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount("#app");
