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

interface CreateUpdateRecordRequest {
  id: null | number;
  amount: number;
  label: string;
  note: string;
  date: string;
  accountId: number | null;
  categoryId: number | null;
}

const RecordApi = {
  API: new API(),
  DOMAIN: "/records",

  /**
   * get all record
   * @param parameters e.g. filtering and sorting
   */
  getAll(parameters = [] as ApiParameter[]): Promise<Response<Record[]>> {
    const userId = this.API.getUserId();
    if (!userId) {
      return Promise.reject("User id not found, login again.");
    }
    parameters.push({ name: "userId", value: userId });
    return this.API.get(this.DOMAIN, parameters);
  },

  /**
   * get record by id
   * @param id record id
   */
  getById(id: string): Promise<Response<Record>> {
    return this.API.get(`${this.DOMAIN}/${id}`);
  },

  /**
   * create new record
   * @param record record data
   */
  createRecord(record: CreateUpdateRecordRequest): Promise<Response<Record>> {
    return this.API.post(this.DOMAIN, record);
  },

  /**
   * update existing record
   * @param id record id
   * @param record record data
   */
  updateRecord(
    id: string,
    record: CreateUpdateRecordRequest
  ): Promise<Response<Record>> {
    return this.API.put(`${this.DOMAIN}/${id}`, record);
  },

  /**
   * delete existing record
   * @param id record id
   */
  deleteRecord(id: string): Promise<Response> {
    return this.API.delete(`${this.DOMAIN}/${id}`);
  },

  /**
   * map Record interface to CreateUpdateRecordRequest interface
   */
  recordToCreateUpdateRecordRequest(record: Record): CreateUpdateRecordRequest {
    return {
      id: record.id,
      amount: record.amount,
      label: record.label,
      note: record.note,
      date: record.date,
      accountId: record.account.id,
      categoryId: record.category.id,
    };
  },
};

export default RecordApi;
export { Record, CreateUpdateRecordRequest };
