import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
// import Classify from '@/views/Classify.vue';

VueRouter.prototype.back = false;
VueRouter.prototype.goBack = function () {
  this.back = true;
  this.go(-1);
};
Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    component: Home,
    name: 'Home',
    children: [
      {
        path: 'classify',
        name: 'Classify',
        component: () => import('@/views/Classify.vue'),
        // component: Classify,
      },
      {
        path: 'shoppingCar',
        name: 'ShoppingCar',
        component: () => import('@/views/ShoppingCar.vue'),
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('@/views/My.vue'),
      },
    ],
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search.vue'),
  },
  {
    path: '*',
    redirect: '/home/classify',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
