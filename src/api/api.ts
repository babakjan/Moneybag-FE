import axios from "axios";
import {
  AxiosRequestConfig as RequestConfig,
  AxiosResponse as Response,
} from "axios";
import store from "@/store";

interface ApiParameter {
  name: string;
  value: string | number | boolean;
}

interface PaginatedResponse<T> {
  items: T[];
  page: number; //index from 0
  size: number;
  totalElements: number;
  pageCount: number;
  pageStart: number;
  pageStop: number;
}

class API {
  axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 10000,
  });

  get(path: string, parameters = [] as ApiParameter[]): Promise<Response> {
    const requestConfig = {
      url: this.createUrl(path, parameters),
      method: "GET",
    } as RequestConfig;

    this.createHeaders(requestConfig);

    return this.axiosInstance.request(requestConfig);
  }

  post(
    path: string,
    // eslint-disable-next-line
    data: any,
    parameters = [] as ApiParameter[]
  ): Promise<Response> {
    const requestConfig = {
      url: this.createUrl(path, parameters),
      method: "POST",
      data: data,
    } as RequestConfig;

    this.createHeaders(requestConfig);

    return this.axiosInstance.request(requestConfig);
  }

  put(
    path: string,
    // eslint-disable-next-line
    data: any,
    parameters = [] as ApiParameter[]
  ): Promise<Response> {
    const requestConfig = {
      url: this.createUrl(path, parameters),
      method: "PUT",
      data: data,
    } as RequestConfig;

    this.createHeaders(requestConfig);

    return this.axiosInstance.request(requestConfig);
  }

  delete(path: string, parameters = [] as ApiParameter[]): Promise<Response> {
    const requestConfig = {
      url: this.createUrl(path, parameters),
      method: "DELETE",
    } as RequestConfig;

    this.createHeaders(requestConfig);

    return this.axiosInstance.request(requestConfig);
  }

  createHeaders(requestConfig: RequestConfig): void {
    const token = store.getters["user/token"];
    let requestHeaders = requestConfig.headers;
    if (!requestHeaders) {
      requestHeaders = {};
    }
    if (token) {
      requestHeaders["Authorization"] = "Bearer " + token;
    }

    requestConfig.headers = requestHeaders;
  }

  createUrl(path: string, parameters = [] as ApiParameter[]): string {
    let delimiter = "?";
    for (const parameter of parameters) {
      path = path + delimiter + parameter.name + "=" + parameter.value;
      delimiter = "&";
    }
    return path;
  }

  //get user id from vuex
  getUserId(): null | number {
    let userId = null;
    if (store.getters["user/user"] != null) {
      userId = store.getters["user/user"].id;
    }
    return userId;
  }
}

export default API;
export { ApiParameter, PaginatedResponse };
