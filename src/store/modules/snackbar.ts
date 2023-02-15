import { Commit } from "vuex";

class State {
  show = false;
  text = "";
}

const snackbar = {
  namespaced: true,
  state: new State(),
  mutations: {
    setShow: (state: State, data: boolean): void => {
      state.show = data;
    },
    setText: (state: State, data: string): void => {
      state.text = data;
    },
  },
  getters: {
    show: (state: State): boolean => {
      return state.show;
    },
    text: (state: State): string => {
      return state.text;
    },
  },
  actions: {
    showSnack: ({ commit }: { commit: Commit }, text: string): void => {
      commit("setText", text);
      commit("setShow", true);
    },
  },
};

export default snackbar;
