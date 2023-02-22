import API, { ApiParameter } from "@/api/api";
import { AxiosResponse as Response } from "axios/index";

interface TotalAnalytic {
  incomes: number;
  expenses: number;
  cashFlow: number;
  balance: number;
  currency: string;
}

const userApi = {
  API: API.getInstance(),
  DOMAIN: "/users",

  /**
   * get total analytic of spending
   * @param parameters parameters
   */
  getTotalAnalytic(
    parameters = [] as ApiParameter[]
  ): Promise<Response<TotalAnalytic>> {
    const userId = this.API.getUserId();
    if (!userId) {
      return Promise.reject("User id not found, login again.");
    }
    return this.API.get(`${this.DOMAIN}/${userId}/totalAnalytic`, parameters);
  },
};

export default userApi;
export { userApi, TotalAnalytic };
