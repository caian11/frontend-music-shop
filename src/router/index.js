import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
import RTL from "../views/Rtl.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
    meta: { requiresAuth: true },
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
    meta: { requiresAuth: true },
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

function isTokenValid(token) {
  if (!token) return false;
  try {
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const rawToken = localStorage.getItem('token');
  const loggedIn = isTokenValid(rawToken);
  const precisaAuth = to.matched.some(r => r.meta.requiresAuth);

  if (precisaAuth && !loggedIn) {
    localStorage.removeItem('token');
    return next({ path: '/signin' });
  }

  next();
});

export default router;
