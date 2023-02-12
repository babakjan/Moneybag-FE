import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/modules/user";

Vue.use(Vuex);

class State {}

const Store = new Vuex.Store<State>({
  state: new State(),
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    user: user,
  },
});

export default Store;
export { Store, State };
