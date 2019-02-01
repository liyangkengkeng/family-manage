// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.  访问到该路由才会加载（路由懒加载）
const Home = () => import(/* webpackChunkName: "home" */ "@/views/Home.vue");

export default [
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {requireAuth: true}, //需要登录才能看到的页面
  }
]