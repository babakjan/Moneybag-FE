import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

class State {
  loggedIn = false;
}

const Store = new Vuex.Store<State>({
  state: new State(),
  mutations: {
    setLoggedIn: (state: State, data: boolean): void => {
      state.loggedIn = data;
    },
  },
  actions: {},
  getters: {
    loggedIn: (state: State): boolean => {
      return state.loggedIn;
    },
  },
  modules: {},
});

export default Store;
export { Store, State };
