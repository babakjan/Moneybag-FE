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

  createHeaders(requestConfig: RequestConfig): void {
    const token = store.getters.token;
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
}

export default API;
