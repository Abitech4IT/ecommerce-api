import { transformGetCartResponse } from "./transform-get-cart-response.service";
import { validateAddToCartRequest } from "./validate-add-to-cart-request.service";

const dataValidation = {
  validateAddToCartRequest,
  transformGetCartResponse,
};

export default dataValidation;
