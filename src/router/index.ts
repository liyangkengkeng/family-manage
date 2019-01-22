import Vue from "vue";
import Router from "vue-router";
import about from './about';
import home from "./home";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    ...about,
    ...home,
  ]
});
