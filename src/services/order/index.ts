import repo from "./repo-helper.service";
import sendOrderDetailsEmail from "./send-order-details.service";

const orderService = {
  sendOrderDetailsEmail,
  repo,
};

export default orderService;
