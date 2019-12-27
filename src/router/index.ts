import Vue from "vue";
import Router from "vue-router";
import login from './login';
import home from "./home";
import activity from "./activity";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: 'familyManage',
  routes: [
    ...login,
    ...home,
    ...activity,
    { path: '/', redirect: '/activity' },
  ]
});
