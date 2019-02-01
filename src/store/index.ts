import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import userManage from './modules/userManage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: 'KR',
  },
  modules: {
    userManage,
  },
  actions,
  mutations,
})