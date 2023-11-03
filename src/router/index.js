import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/auth/Login.vue";
import Signup from "../components/auth/Signup.vue";
import Dashboard from "../components/Dashboard.vue";
import HospitalUpdate from "../components/actions/HospitalUpdate.vue";
import HospitalCreate from "../components/actions/HospitalCreate.vue";

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
      {
        path: "update",
        name: "update",
        component: HospitalUpdate,
      },
      {
        path: "create",
        name: "create",
        component: HospitalCreate,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
