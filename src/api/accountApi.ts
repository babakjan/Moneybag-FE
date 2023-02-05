import API from "./api";
import { AxiosResponse as Response } from "axios";

interface Account {
  name: string;
  balance: number;
  currency: string;
}

const AccountApi = {
  API: new API(),
  DOMAIN: "/accounts",

  getAllAccounts: function (): Promise<Response<Account[]>> {
    return this.API.get(this.DOMAIN);
  },
};

export default AccountApi;
export { AccountApi, Account };
