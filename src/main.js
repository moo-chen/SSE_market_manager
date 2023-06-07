import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueParticles from 'vue-particles';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import './style/scss/index.scss';

Vue.config.productionTip = false;
Vue.use(VueParticles);
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(Vuelidate);
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
