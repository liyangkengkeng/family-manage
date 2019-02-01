import Vue from "vue";
import App from "./App.vue";
import router from "@/router/index";
import store from "@/store/index";
import "@/styles/common.styl";

Vue.config.productionTip = false;

router.beforeEach((to,from,next) => {
  if(to.meta.requireAuth) {
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
