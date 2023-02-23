import API, { ApiParameter } from "@/api/api";
import { AxiosResponse as Response } from "axios/index";

//total analytic of spending of user
interface TotalAnalytic {
  incomes: number;
  expenses: number;
  cashFlow: number;
  balance: number;
  currency: string;
}

//time series entry (chart point)
interface TimeSeriesEntry {
  y: number;
  x: Date;
}

/**
 * api, which is responsible for requests related to user
 */
const userApi = {
  API: API.getInstance(),
  DOMAIN: "/users",

  /**
   * get total analytic of spending
   * @param parameters parameters, for example date interval
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

  /**
   * Get total balance evolution
   * @param parameters parameters, for example date interval
   */
  getBalanceEvolution(
    parameters = [] as ApiParameter[]
  ): Promise<Response<TimeSeriesEntry[]>> {
    const userId = this.API.getUserId();
    if (!userId) {
      return Promise.reject("User id not found, login again.");
    }
    return this.API.get(
      `${this.DOMAIN}/${userId}/balanceEvolution`,
      parameters
    );
  },
};

export default userApi;
export { userApi, TotalAnalytic, TimeSeriesEntry };
