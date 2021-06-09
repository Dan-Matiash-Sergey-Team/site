import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"
import vSelect from 'vue-select'
import YmapPlugin from "vue-yandex-maps"
import './assets/sass/main.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import elementLocale from 'element-ui/lib/locale/lang/ru-RU'


Vue.config.productionTip = false;
const settings = {
  apiKey: '4877efab-fec0-4e66-956d-33db0d22ab10',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1',
  mode: 'debug'
}
Vue.use(YmapPlugin, settings)
Vue.component("v-select", vSelect);
Vue.use(ElementUI, { locale: elementLocale })


new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount("#app");
