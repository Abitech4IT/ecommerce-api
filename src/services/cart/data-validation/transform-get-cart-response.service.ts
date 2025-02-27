import Cart from "@models/cart.model";
import { z } from "zod";

const nString = z.string().nullable().catch(null);
const nDate = z.coerce.date().nullable().catch(null);

export const transformGetCartResponse = async (value: Cart) => {
  const response = await responseSchema.safeParseAsync(value);

  const data = response.data;
  if (data) {
  }
  return data;
};

const userSchema = z
  .object({
    id: nString,
    firstName: nString,
    lastName: nString,
    email: nString,
    phoneNumber: nString,
    address: nString,
  })
  .nullish()
  .promise()
  .transform(async (e) => await e);

const responseSchema = z.object({
  id: nString,
  title: nString,
  user: userSchema,
  createdAt: nDate,
  updatedAt: nDate,
});
