import { getInt } from "@helpers/type-helper";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const sendMail = async (
  options: SendEmailOptions
): Promise<[SMTPTransport.SentMessageInfo, Error?]> => {
  const emailAddress = process.env.EMAIL_ADDRESS ?? "";
  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: getInt(process.env.EMAIL_PORT) ?? undefined,
    secure: false, // true for 465, false for other ports
    auth: {
      user: emailAddress,
      pass: process.env.EMAIL_PASSWORD ?? "",
    },
  });

  var mailOptions: Mail.Options = {
    from: { address: emailAddress, name: process.env.EMAIL_NAME ?? "" },
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  let info: any;
  try {
    info = await new Promise<SMTPTransport.SentMessageInfo>(function (
      resolve,
      reject
    ) {
      transporter.sendMail(mailOptions, (err, infoRes) => {
        if (err) {
          reject(err);
        } else {
          resolve(infoRes);
        }
      });
    });
  } catch (err) {
    return [null!, err];
  }

  return [info];
};

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
}
