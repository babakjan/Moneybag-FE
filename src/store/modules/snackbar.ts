import { Commit } from "vuex";

//global snackbar logic for displaying errors and messages
class State {
  show = false; //if snackbar is shown or not
  text = ""; //snackbar text (message)
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
    //snow snackbar and display text
    showSnack: ({ commit }: { commit: Commit }, text: string): void => {
      commit("setText", text);
      commit("setShow", true);
    },
  },
};

export default snackbar;
