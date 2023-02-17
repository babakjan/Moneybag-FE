import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/accounts/create",
    name: "CreateAccount",
    component: () => import("../views/CreateUpdateAccount.vue"),
    meta: {
      requiresAuth: true,
    },
    props: {
      update: false,
      title: "Create account",
    },
  },
  {
    path: "/accounts/:accountId",
    name: "UpdateAccount",
    component: () => import("../views/CreateUpdateAccount.vue"),
    meta: {
      requiresAuth: true,
      title: "Update account",
    },
    props: {
      update: true,
    },
  },
  {
    path: "/records/create",
    name: "CreateRecord",
    component: () => import("../views/CreateUpdateRecord.vue"),
    meta: {
      requiresAuth: true,
    },
    props: {
      update: false,
      title: "Create record",
    },
  },
  {
    path: "/records/:recordId",
    name: "UpdateRecord",
    component: () => import("../views/CreateUpdateRecord.vue"),
    meta: {
      requiresAuth: true,
      title: "Update record",
    },
    props: {
      update: true,
    },
  },
  {
    path: "/records",
    name: "Records",
    component: () => import("../views/Records.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LogIn.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  //if we are on login page, and we are logged in go to dashboard
  if (to.path === "/login" && store.getters["user/loggedIn"]) {
    next("/dashboard");
    return;
  }

  //if page requires authentication and user isn't logged in
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !store.getters["user/loggedIn"]
  ) {
    next("/login");
    return;
  }

  next();
});

export default router;
