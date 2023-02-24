import API from "@/api/api";
import { AxiosResponse as Response } from "axios";
import { User } from "@/store/modules/user";

//register new user request body
interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  currency: string;
}

//authenticate existing user request body
interface AuthenticationRequest {
  email: string;
  password: string;
}

//authenticate existing user response body
interface AuthenticationResponse {
  token: string; //JWT token
  user: User;
}

/**
 * api, which is responsible for authentication and registration
 */
const AuthentizationApi = {
  API: API.getInstance(),
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
