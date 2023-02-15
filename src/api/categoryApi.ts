import API from "@/api/api";
import { AxiosResponse as Resposne } from "axios";

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}

const categoryApi = {
  API: new API(),
  DOMAIN: "/categories",

  getAll(): Promise<Resposne<Category[]>> {
    return this.API.get(this.DOMAIN);
  },
};

export default categoryApi;
export { Category };
