import { Request } from "express";
import { z, ZodIssue } from "zod";

const rString = z.string().trim().min(1);
const rNumber = z.number().min(1);

const bodySchema = z.object({
  productId: rString,
  quantity: rNumber,
});

export const validateAddToCartRequest = (req: Request): ValidateResponse => {
  const parsedBody = bodySchema.safeParse(req.body);

  if (!parsedBody.success) {
    return [null, [...(parsedBody.error?.errors ?? [])]];
  }

  return [{ body: parsedBody.data }, null];
};

type RequestBody = z.infer<typeof bodySchema>;
type SuccessResponse = { body: RequestBody };

export type ValidateResponse = [SuccessResponse, null] | [null, ZodIssue[]];
