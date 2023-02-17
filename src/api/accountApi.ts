import API from "./api";
import { AxiosResponse as Response } from "axios";

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

interface AccountReduced {
  id: number;
  name: string;
  currency: string;
  color: string;
  icon: string;
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

  //get all
  getAll(withIncomesAndExpenses = false): Promise<Response<Account[]>> {
    const userId = this.API.getUserId();
    if (!userId) {
      return Promise.reject("User id not found, login again.");
    }
    return this.API.get(`/users/${userId}/accounts`, [
      { name: "withIncomesAndExpenses", value: withIncomesAndExpenses },
    ]);
  },

  //get by id
  getById(id: string): Promise<Response<Account>> {
    return this.API.get(`${this.DOMAIN}/${id}`);
  },

  //create
  createAccount(data: CreateUpdateAccountRequest): Promise<Response<Account>> {
    const userId = this.API.getUserId();
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
    const userId = this.API.getUserId();
    if (!userId) {
      return Promise.reject("User id not found, login again.");
    }
    data.userId = userId;
    return this.API.put(`${this.DOMAIN}/${id}`, data);
  },

  //delete
  deleteAccount(id: string): Promise<Response> {
    return this.API.delete(`${this.DOMAIN}/${id}`);
  },
};

export default AccountApi;
export { AccountApi, Account, AccountReduced, CreateUpdateAccountRequest };
