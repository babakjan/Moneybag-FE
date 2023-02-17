import API from "@/api/api";
import { AxiosResponse as Response } from "axios";
import { User } from "@/store/modules/user";

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
  token: string; //JWT token
  user: User;
}

const AuthentizationApi = {
  API: new API(),
  DOMAIN: "/auth",

  /**
   * register new user
   * @param user user data
   */
  register(user: RegisterRequest): Promise<Response<AuthenticationResponse>> {
    return this.API.post(this.DOMAIN + "/register", user);
  },

  /**
   * authenticate registered user
   * @param request request data
   */
  authenticate(
    request: AuthenticationRequest
  ): Promise<Response<AuthenticationResponse>> {
    return this.API.post(this.DOMAIN + "/authenticate", request);
  },
};

export default AuthentizationApi;
export { RegisterRequest, AuthenticationRequest, AuthenticationResponse };
