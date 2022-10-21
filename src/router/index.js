import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/sign_up",
    name: "sign_up",
    component: () => import("../views/SignUpView.vue"),
  },
  {
    path: "/logs",
    name: "logs",
    component: () => import("../views/LogsView.vue"),
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("../views/LogoutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
