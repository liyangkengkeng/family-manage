import Vue from "vue";
import Router from "vue-router";
import login from './login';
import home from "./home";
console.log(111,process.env.BASE_URL)
Vue.use(Router);

export default new Router({
  mode: "history",
  base: 'familyManage',
  routes: [
    ...login,
    ...home,
    { path: '/', redirect: '/login' },
  ]
});
