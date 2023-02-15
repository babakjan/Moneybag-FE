interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  accountIds: number;
}

class State {
  user = null as null | User;
  token = null as string | null;
}

const user = {
  namespaced: true,
  state: new State(),
  mutations: {
    setUser: (state: State, data: User): void => {
      state.user = { ...data };
    },
    setTokenAndUser: (
      state: State,
      { token, user }: { token: string; user: User }
    ): void => {
      state.user = user;
      state.token = token;
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
      return state.user != null;
    },
    token: (state: State): string | null => {
      return state.token;
    },
  },
  actions: {},
};

export default user;
export { User };
