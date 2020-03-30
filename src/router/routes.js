import routesHome from "./routesHome";
import routesExample from "./routesExample";

import AdminLayout from "@/components/AdminLayout.vue";
import Login from "@/views/Login.vue";

export default [
  {
    path: "/auth",
    component: Login,
    name: "Login"
  },
  {
    path: "/",
    component: AdminLayout,
    redirect: { name: "Home" },
    children: [...routesHome, ...routesExample]
  }
];
