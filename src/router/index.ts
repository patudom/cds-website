import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(VueRouter);

function importComponent(name: string): () => Promise<typeof import("*.vue")> {
  return () => import(`@/views/${name}.vue`);
}

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/create-account",
    name: "Create Account",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: importComponent("CreateAccount"),
    meta: { guest: true }
  },
  {
    path: "/login",
    name: "Login",
    component: importComponent("Login"),
    meta: { guest: true }
  },
  {
    path: "/educator-create",
    name: "Create Educator Account",
    component: importComponent("CreateEducatorAccount"),
    meta: { guest: true }
  },
  {
    path: "/student-create",
    name: "Create Student Account",
    component: importComponent("CreateStudentAccount"),
    meta: { guest: true }
  },
  {
    path: "/manage-classrooms",
    name: "Manage Classrooms",
    component: importComponent("ManageClasses"),
    meta: { requiresAuth: true }
  },
  {
    path: "/educator-account-created",
    name: "Educator Account Created",
    component: importComponent("EducatorAccountCreated")
  },
  {
    path: "/student-account-created",
    name: "Student Account Created",
    component: importComponent("StudentAccountCreated")
  },
  {
    path: "/roster-data/:classID",
    name: "Roster Data",
    component: importComponent("ClassInformation"),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/current-activities",
    name: "Current Activities",
    component: importComponent("CurrentActivities"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, _from, next) => {
  let isAuthenticated = store.getters["api/isLoggedIn"];
  if (!isAuthenticated) {
    const response = await store.dispatch("api/submitSessionLogin");
    console.log(response);
  }
  isAuthenticated = store.getters["api/isLoggedIn"];
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else if (to.matched.some(record => record.meta.guest)) {
    if (isAuthenticated) {
      next("/manage-classrooms");
      return;
    }
  }
  next();
});

export default router;
