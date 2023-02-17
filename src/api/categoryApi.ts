import API from "@/api/api";
import { AxiosResponse as Response } from "axios";

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}

const categoryApi = {
  API: new API(),
  DOMAIN: "/categories",

  /**
   * get all categories
   */
  getAll(): Promise<Response<Category[]>> {
    return this.API.get(this.DOMAIN);
  },
};

export default categoryApi;
export { Category };
