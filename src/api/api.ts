import axios from "axios";
import {
  AxiosRequestConfig as RequestConfig,
  AxiosResponse as Response,
} from "axios";

class API {
  axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 10000,
  });

  get(path: string): Promise<Response> {
    const requestConfig = {
      url: path,
      method: "GET",
    } as RequestConfig;

    return this.axiosInstance.request(requestConfig);
  }

  post(path: string, data: any): Promise<Response> {
    const requestConfig = {
      url: path,
      method: "POST",
      data: data,
    } as RequestConfig;

    return this.axiosInstance.request(requestConfig);
  }
}

export default API;
