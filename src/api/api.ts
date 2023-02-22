import axios from "axios";
import {
  AxiosRequestConfig as RequestConfig,
  AxiosResponse as Response,
} from "axios";
import store from "@/store";

//query parameter
interface ApiParameter {
  name: string;
  value: string | number | boolean;
}

//sometimes api returns paginated response
interface PaginatedResponse<T> {
  content: T[];
  number: number; // page number (indexed from 0)
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  empty: boolean;
}

/**
 * API with basic http methods, takes care for authentication
 */
class API {
  axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 10000,
  });

  /**
   * forbid constructor, because api is a singleton
   */
  private constructor() {
    //
  }

  static singletonInstance = null as null | API;

  /**
   * @return singleton instance
   */
  static getInstance(): API {
    if (!this.singletonInstance) {
      this.singletonInstance = new API();
    }
    return this.singletonInstance;
  }

  /**
   * http GET
   * @param path path in url
   * @param parameters query parameters
   */
  get(path: string, parameters = [] as ApiParameter[]): Promise<Response> {
    const requestConfig = {
      url: this.createUrl(path, parameters),
      method: "GET",
    } as RequestConfig;

    this.createHeaders(requestConfig);

    return this.axiosInstance.request(requestConfig);
  }

  /**
   * http POST
   * @param path path in url
   * @param data request body
   * @param parameters query parameters
   */
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

  /**
   * http PUT
   * @param path path in url
   * @param data request body
   * @param parameters query parameters
   */
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

  /**
   * http DELETE
   * @param path path in url
   * @param parameters query parameters
   */
  delete(path: string, parameters = [] as ApiParameter[]): Promise<Response> {
    const requestConfig = {
      url: this.createUrl(path, parameters),
      method: "DELETE",
    } as RequestConfig;

    this.createHeaders(requestConfig);

    return this.axiosInstance.request(requestConfig);
  }

  /**
   * create headers from request headers and add authorization
   * @param requestConfig request configuration
   */
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

  /**
   * create url from path and query parameters
   * @param path path path in url
   * @param parameters query parameters
   */
  createUrl(path: string, parameters = [] as ApiParameter[]): string {
    let delimiter = "?";
    for (const parameter of parameters) {
      path = path + delimiter + parameter.name + "=" + parameter.value;
      delimiter = "&";
    }
    return path;
  }

  /**
   * get user id
   * @return user id from vuex if exists, null otherwise
   */
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
