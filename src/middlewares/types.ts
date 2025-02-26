import { Request } from "express";
import User from "@models/user.model";

export interface CustomRequest extends Request {
  user?: User;
}

export interface DecodedToken {
  id: string;
  iat?: number;
  exp?: number;
  userId: string;
}
