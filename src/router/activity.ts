// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.  访问到该路由才会加载（路由懒加载）
const Activity = () => import(/* webpackChunkName: "activity" */ "@/views/Activity.vue");

export default [
  {
    path: '/activity',
    name: 'activity',
    component: Activity,
  }
]