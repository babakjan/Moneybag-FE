import { AxiosResponse as Response } from "axios";
import API from "@/api/api";
import { ApiParameter } from "@/api/api";
import { Category } from "@/api/categoryApi";
import { AccountReduced } from "@/api/accountApi";

interface Record {
  id: number;
  amount: number;
  label: string;
  note: string;
  date: string;
  account: AccountReduced;
  category: Category;
}

const RecordApi = {
  API: new API(),
  DOMAIN: "/records",

  getAll(parameters = [] as ApiParameter[]): Promise<Response<Record[]>> {
    const userId = this.API.getUserId();
    if (!userId) {
      return Promise.reject("User id not found, login again.");
    }
    parameters.push({ name: "userId", value: userId });
    return this.API.get(this.DOMAIN, parameters);
  },
};

export default RecordApi;
export { Record };
