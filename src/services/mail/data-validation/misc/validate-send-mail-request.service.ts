import { Request } from "express";
import { z, ZodIssue } from "zod";

const rString = z.string().trim().min(1);
const oString = z.string().optional();

const bodySchema = z.object({
  to: rString,
  subject: rString,
  text: oString,
  html: oString,
});

export const validateSendMailRequest = (req: Request): ValidateResponse => {
  const parsedBody = bodySchema.safeParse(req.body);

  if (!parsedBody.success) {
    return [null, parsedBody.error.errors];
  }

  return [{ body: parsedBody.data }, null];
};

type RequestBody = z.infer<typeof bodySchema>;
type SuccessResponse = { body: RequestBody };

type ValidateResponse = [SuccessResponse, null] | [null, ZodIssue[]];
