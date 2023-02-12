import API from "@/api/api";
import { AxiosResponse as Response } from "axios";

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthenticationRequest {
  email: string;
  password: string;
}

interface AuthenticationResponse {
  token: string;
}

const AuthentizationApi = {
  API: new API(),
  DOMAIN: "/auth",

  register(data: RegisterRequest): Promise<Response<AuthenticationResponse>> {
    return this.API.post(this.DOMAIN + "/register", data);
  },
  authenticate(
    data: AuthenticationRequest
  ): Promise<Response<AuthenticationResponse>> {
    return this.API.post(this.DOMAIN + "/authenticate", data);
  },
};

export default AuthentizationApi;
export { RegisterRequest, AuthenticationRequest, AuthenticationResponse };
