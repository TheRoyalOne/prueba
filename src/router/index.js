import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/auth/Login.vue";
import Signup from "../components/auth/Signup.vue";
import Dashboard from "../components/Dashboard.vue";

const routes = [
  {
    path: "/",
    children: [
      {
        path: "",
        name: "login",
        component: Login,
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "signup",
        name: "signup",
        component: Signup,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
