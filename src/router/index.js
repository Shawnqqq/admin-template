import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// import Cookie from "js-cookie";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta.title) document.title = to.meta.title;

  // let hasToken = Cookie.get("web_admin_token") ? true : false;
  // if (to.name === "Login" && hasToken) {
  //   next({ name: "Home" });
  // }
  // if (to.name !== "Login" && !hasToken) {
  //   next({ name: "Login" });
  // }

  next();
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
