import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Todo from "../views/Todo.vue";
import config from "@/config";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { redirect: true }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { redirect: true }
  },
  {
    path: "/todo",
    name: "Todo",
    component: Todo,
    meta: { auth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {

  if (to.meta && to.meta.auth) {
    const jwt = localStorage.getItem("token") || "";
    if (jwt.length > 0) {
      const req = await fetch(config.url + "user/auth", {
        headers: { "Content-Type": "application/json", authorization: jwt },
      });

      const data = await req.json();

      if (!data.error) {
        localStorage.setItem("user", JSON.stringify(data.data));
        next();
        return;
      }

    }

    next(from.path);
    return;
  }

  if (to.meta && to.meta.redirect) {
    const user = localStorage.getItem('user') || "";

    if (user.length > 0) {
      next({ name: "Todo" });
      return;
    }
  }

  next();
});

export default router;
