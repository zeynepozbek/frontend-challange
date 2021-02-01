import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import JobList from '@/components/JobList';
import JobDetail from '@/components/JobDetail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/joblist',
      name: 'JobList',
      component: JobList,
    },
    {
      path: '/jobdetail/:id',
      name: 'JobDetail',
      component: JobDetail,
    },
  ],
});
