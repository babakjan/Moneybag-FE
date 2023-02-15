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

interface CreateUpdateAccountRequest {
  id: null | number;
  name: string;
  currency: string;
  balance: number;
  color: string;
  icon: string;
  includeInStatistic: boolean;
  userId: number;
}

const AccountApi = {
  API: new API(),
  DOMAIN: "/accounts",

  //get all with incomes and expenses
  getUserAccountsWithIncomesAndExpenses(): Promise<Response<Account[]>> {
    const userId = this._getUserId();
    if (!userId) {
      return Promise.reject("User id not found, login again.");
    }
    return this.API.get("/users/" + userId + "/accounts", [
      { name: "withIncomesAndExpenses", value: true },
    ]);
  },

  //get by id
  getById(id: string): Promise<Response<Account>> {
    return this.API.get(this.DOMAIN + `/${id}`);
  },

  //create
  createAccount(data: CreateUpdateAccountRequest): Promise<Response<Account>> {
    const userId = this._getUserId();
    if (!userId) {
      return Promise.reject("User id not found, login again.");
    }
    data.userId = userId;
    return this.API.post(this.DOMAIN, data);
  },

  //update
  updateAccount(
    id: string,
    data: CreateUpdateAccountRequest
  ): Promise<Response<Account>> {
    const userId = this._getUserId();
    if (!userId) {
      return Promise.reject("User id not found, login again.");
    }
    data.userId = userId;
    return this.API.put(this.DOMAIN + `/${id}`, data);
  },

  //delete
  deleteAccount(id: string): Promise<Response> {
    return this.API.delete(this.DOMAIN + `/${id}`);
  },

  //get user id from vuex
  _getUserId(): null | number {
    let userId = null;
    if (store.getters.user != null) {
      userId = store.getters.user.id;
    }
    return userId;
  },
};

export default AccountApi;
export { AccountApi, Account, CreateUpdateAccountRequest };
