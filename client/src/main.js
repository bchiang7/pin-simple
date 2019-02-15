import Vue from 'vue';
import App from './App.vue';
import { Boards, Board, Pin } from './components';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
  {
    path: '*',
    component: Boards,
  },
  {
    path: '/',
    redirect: '/boards',
  },
  {
    path: '/boards',
    component: Boards,
  },
  {
    path: '/board/:id',
    name: 'board',
    component: Board,
  },
  {
    path: '/pin/:id',
    name: 'pin',
    component: Pin,
  },
];

const router = new VueRouter({ routes });

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
