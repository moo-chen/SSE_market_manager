import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './module/user';
import postModule from './module/feedback';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userModule,
    postModule,
  },
});
