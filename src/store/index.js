import Vue from "vue";
import Vuex from "vuex";
import Cookie from "js-cookie";

Vue.use(Vuex);

const DOMAIN = process.env.VUE_APP_DOMAIN;

export default new Vuex.Store({
  state: {},
  getters: {
    name() {
      return Cookie.get("web_name", { domain: DOMAIN });
    }
  },
  mutations: {},
  actions: {
    logout() {
      Cookie.remove("web_id", { domain: DOMAIN });
      Cookie.remove("web_name", { domain: DOMAIN });
      Cookie.remove("web_admin_token", { domain: DOMAIN });
      Cookie.remove("web_user_role", { domain: DOMAIN });
      location.reload();
    }
  }
});
