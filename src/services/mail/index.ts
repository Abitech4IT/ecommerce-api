import dataValidation from "./data-validation";
import { sendMail } from "./send-mail.service";

const mailService = {
  dataValidation,
  sendMail,
};

export default mailService;
