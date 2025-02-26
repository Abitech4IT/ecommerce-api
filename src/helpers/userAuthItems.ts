import User from "@models/user.model";
import { Request } from "express";

export type UserAuthItems = {
  loggedIn: boolean;
  token?: string;
  user?: User;
  userId?: string;
  errorMessage?: string;
};

export type UserRequest = Request & { userAuthItems: UserAuthItems };

export const getUserAuthItems = (req: Request) => {
  return req["userAuthItems"] as UserAuthItems;
};
