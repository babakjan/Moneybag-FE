import API, { ApiParameter } from "@/api/api";
import { AxiosResponse as Response } from "axios";

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}

interface CategoryAnalytic {
  category: Category;
  amount: number; //sum of record amounts from this category
  numberOfRecords: number; //number of records in this category
}

/**
 * api, which is responsible for requests related to categories
 */
const categoryApi = {
  API: API.getInstance(),
  DOMAIN: "/categories",

  /**
   * get all categories
   */
  getAll(): Promise<Response<Category[]>> {
    return this.API.get(this.DOMAIN);
  },

  /**
   * get category analytic by user id
   * @param parameters query parameters
   */
  getAnalytic(
    parameters = [] as ApiParameter[]
  ): Promise<Response<CategoryAnalytic[]>> {
    const userId = this.API.getUserId();
    if (!userId) {
      return Promise.reject("User id not found, login again.");
    }
    parameters.push({ name: "userId", value: userId });
    return this.API.get(`${this.DOMAIN}/analytic`, parameters);
  },
};

export default categoryApi;
export { Category, CategoryAnalytic };
