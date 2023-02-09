import { createRouter, createWebHistory } from "vue-router";
import CompaniesView from "../views/CompaniesView.vue";
import EditCompany from "../components/Companies/EditCompany.vue";
import CreateCompany from "../components/Companies/CreateCompany.vue";
import OrdersGrid from "../components/Orders/OrdersGrid.vue";
import EditOrder from "../components/Orders/EditOrder.vue";
import CreateOrder from "../components/Orders/CreateOrder.vue";
import TheRegister from "../components/TheRegister.vue";
import TheLogin from "../components/TheLogin.vue";

import axios from "axios";

const getCurrentUser = async () => {
  const res = await axios.get("http://localhost:3000/api/users/currentUser");
  return res.data;
};

const requireAuth = async (to, from, next) => {
  const user = await getCurrentUser();
  if (!user) {
    next({ name: "TheLogin" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "companies",
    component: CompaniesView,
  },
  {
    path: "/companies/:id",
    name: "EditCompany",
    component: EditCompany,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/companies/createCompany",
    name: "CreateCompany",
    component: CreateCompany,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/companies/:id/orders",
    name: "OrdersGrid",
    component: OrdersGrid,
    props: true,
  },
  {
    path: "/companies/:companyId/orders/:orderId",
    name: "EditOrder",
    component: EditOrder,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/companies/:companyId/orders/createOrder",
    name: "CreateOrder",
    component: CreateOrder,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/register",
    name: "TheRegister",
    component: TheRegister,
  },
  {
    path: "/login",
    name: "TheLogin",
    component: TheLogin,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
