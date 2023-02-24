interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  accountIds: number;
  currency: string;
}

class State {
  user = null as null | User;
  token = null as string | null; //JWT token
  userLocalStorageKey = "user";
  tokenLocalStorageKey = "token";
  expirationStorageKey = "expiration";
}

const user = {
  namespaced: true,
  state: new State(),
  mutations: {
    setTokenAndUser: (
      state: State,
      { token, user }: { token: string; user: User }
    ): void => {
      state.user = user;
      state.token = token;
      const expiration = new Date();
      expiration.setDate(expiration.getDate() + 1);
      sessionStorage.setItem(
        state.expirationStorageKey,
        expiration.toISOString()
      );
      sessionStorage.setItem(state.tokenLocalStorageKey, state.token);
      sessionStorage.setItem(
        state.userLocalStorageKey,
        JSON.stringify(state.user)
      );
    },
    //set user and token to null
    logOut: (state: State): void => {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem(state.tokenLocalStorageKey);
      sessionStorage.removeItem(state.userLocalStorageKey);
    },
    //load user and token from local storage
    loadFromLocalStorage(state: State): void {
      const expiration = sessionStorage.getItem(state.expirationStorageKey);
      const token = sessionStorage.getItem(state.tokenLocalStorageKey);
      const user = sessionStorage.getItem(state.userLocalStorageKey);
      if (!expiration || !token || !user) {
        return;
      }
      if (new Date().getTime() > new Date(expiration).getTime()) {
        //token already expired
        state.user = null;
        state.token = null;
        sessionStorage.removeItem(state.tokenLocalStorageKey);
        sessionStorage.removeItem(state.userLocalStorageKey);
        return;
      }
      state.user = JSON.parse(user) as User;
      state.token = token;
    },
  },
  getters: {
    user: (state: State): User | null => {
      return state.user;
    },
    //if user is logged in or not
    loggedIn: (state: State): boolean => {
      return state.user != null && state.token != null;
    },
    token: (state: State): string | null => {
      return state.token;
    },
    currency: (state: State): string | undefined => {
      return state.user?.currency;
    },
  },
  actions: {},
};

export default user;
export { User };
