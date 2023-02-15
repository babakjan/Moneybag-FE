import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/modules/user";
import snackbar from "@/store/modules/snackbar";

Vue.use(Vuex);

class State {}

const Store = new Vuex.Store<State>({
  state: new State(),
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    user: user,
    snackbar: snackbar,
  },
});

export default Store;
export { Store, State };
