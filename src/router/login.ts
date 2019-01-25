// route level code-splitting
// this generates a separate chunk (login.[hash].js) for this route
// which is lazy-loaded when the route is visited.  访问到该路由才会加载（路由懒加载）
const Login = () => import(/* webpackChunkName: "login" */ "@/views/Login.vue");

export default [
  {
    path: '/login',
    name: 'login',
    component: Login,
  }
]