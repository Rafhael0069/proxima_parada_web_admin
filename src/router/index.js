import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path:"/",
    redirect:{ name: "signinadmin" },
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("../layouts/AuthLayout.vue"),
    children:[
      {
        path: "",
        redirect: { name: "signinadmin" },
      },
      {
        path: "/signinadmin",
        name: "signinadmin",
        component: () => import("../pages/SignInAdminPage.vue"),
      },
    ],
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        redirect: { name: "dashboard" },
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("../pages/DashboadPage.vue"),
      },
      {
        path: "users",
        name: "users",
        component: () => import("../pages/UsersPage.vue"),
      },
      {
        path: "requisitions",
        name: "requisitions",
        component: () => import("../pages/RequisitionsPage.vue"),
      },
      
      {
        path: "new-admin",
        name: "newadmin",
        component: () => import("../pages/NewAdminPage.vue"),
      },
      /* {
        path: "profile-admin",
        name: "profile-admin",
        component: () => import("../pages/admin/ProfileAdminPage.vue"),
      }, */
    ],
  },
];

const router = new VueRouter({
/*   mode: "history", */
  routes,
});

export default router;
