import { validateLoginRequest } from "./validate-user-login-request.service";
import { validateUserSignUpRequest } from "./validate-user-sign-up-request.service";

const dataValidation = {
  validateUserSignUpRequest,
  validateLoginRequest,
};

export default dataValidation;
