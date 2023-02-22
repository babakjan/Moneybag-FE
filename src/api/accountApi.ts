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
  API: API.getInstance(),
  DOMAIN: "/accounts",

  /**
   * get all accounts of signed user
   * @param withIncomesAndExpenses if yes accounts contain incomes and expenses from current month,
   * otherwise incomes and expenses are null
   */
  getAll(withIncomesAndExpenses = false): Promise<Response<Account[]>> {
    const userId = this.API.getUserId();
    if (!userId) {
      return Promise.reject("User id not found, login again.");
    }
    return this.API.get(`/users/${userId}/accounts`, [
      { name: "withIncomesAndExpenses", value: withIncomesAndExpenses },
    ]);
  },

  /**
   * get account by id
   * @param id account id
   */
  getById(id: string): Promise<Response<Account>> {
    return this.API.get(`${this.DOMAIN}/${id}`);
  },

  /**
   * crete new account
   * @param account account data
   */
  createAccount(
    account: CreateUpdateAccountRequest
  ): Promise<Response<Account>> {
    const userId = this.API.getUserId();
    if (!userId) {
      return Promise.reject("User id not found, login again.");
    }
    account.userId = userId;
    return this.API.post(this.DOMAIN, account);
  },

  /**
   * update existing account
   * @param id account id
   * @param account account data
   */
  updateAccount(
    id: string,
    account: CreateUpdateAccountRequest
  ): Promise<Response<Account>> {
    const userId = this.API.getUserId();
    if (!userId) {
      return Promise.reject("User id not found, login again.");
    }
    account.userId = userId;
    return this.API.put(`${this.DOMAIN}/${id}`, account);
  },

  /**
   * delete existing account
   * @param id account id
   */
  deleteAccount(id: string): Promise<Response> {
    return this.API.delete(`${this.DOMAIN}/${id}`);
  },
};

export default AccountApi;
export { AccountApi, Account, AccountReduced, CreateUpdateAccountRequest };
