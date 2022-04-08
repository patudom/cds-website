import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

function importComponent(name: string): () => Promise<typeof import('*.vue')> {
  return () => import(`@/views/${name}.vue`);
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create-account',
    name: 'Create Account',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: importComponent('CreateAccount')
  },
  {
    path: '/login',
    name: 'Login',
    component: importComponent('Login')
  },
  {
    path: '/educator-create',
    name: 'Create Educator Account',
    component: importComponent('CreateEducatorAccount')
  },
  {
    path: '/student-create',
    name: 'Create Student Account',
    component: importComponent('CreateStudentAccount')
  },
  {
    path: '/manage-classrooms',
    name: 'Manage Classrooms',
    component: importComponent('ManageClasses')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
