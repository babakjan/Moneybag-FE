import API from "./api";
import { AxiosResponse as Response } from "axios";
import store from "@/store";

interface Account {
  id: number;
  name: string;
  currency: string;
  balance: number;
  color: string;
  icon: string;
  includeInStatistic: boolean;
  recordIds: number[];
  userId: number;
  incomes: number | null;
  expenses: number | null;
}

const AccountApi = {
  API: new API(),
  DOMAIN: "/accounts",

  getUserAccountsWithIncomesAndExpenses(): Promise<Response<Account[]>> {
    let userId = null;
    if (store.getters.user != null) {
      userId = store.getters.user.id;
    }
    if (!userId) {
      return Promise.reject("User id not found, login again.");
    }
    return this.API.get("/users/" + userId + "/accounts", [
      { name: "withIncomesAndExpenses", value: true },
    ]);
  },
};

export default AccountApi;
export { AccountApi, Account };
