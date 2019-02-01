import Vue from "vue";
import App from "./App.vue";
import router from "@/router/index";
import store from "@/store/index";
import "@/styles/common.styl";

Vue.config.productionTip = false;

router.beforeEach((to,from,next) => {
  if(to.meta.requireAuth) {
    //先来一个最笨的方法，前端路由如果需要登录才能看的
    store.dispatch('userManage/IS_LOGIN')
      .then(res => {
        
      })
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
