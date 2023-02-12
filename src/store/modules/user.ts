interface User {
  email: string;
  token: string;
}

class State {
  user = null as null | User;
}

const user = {
  namespaced: false,
  state: new State(),
  mutations: {
    setUser: (state: State, data: User): void => {
      state.user = { ...data };
    },
    logOut: (state: State): void => {
      state.user = null;
    },
  },
  getters: {
    user: (state: State): User | null => {
      return state.user;
    },
    loggedIn: (state: State): boolean => {
      console.log("login geter");
      return state.user != null;
    },
  },
  actions: {},
};

export default user;
export { User };
