import { getJwtToken } from "@helpers/jwt-helper";
import User from "@models/user.model";
import express from "express";

export const createSendToken = (
  user: User,
  statusCode: number,
  res: express.Response
) => {
  const token = getJwtToken(user);
  const cookieExpiresIn = Number(process.env.JWT_COOKIE_EXPIRES_IN) || 7;

  const cookieOptions: {
    expires: Date;
    httpOnly: boolean;
    secure?: boolean;
  } = {
    expires: new Date(Date.now() + cookieExpiresIn * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Create a new object without the password
  //   user.password = undefined;
  const userResponse = { ...user.toJSON() };
  delete userResponse.password;

  res.status(statusCode).json({
    status: "success",
    token,
    user: userResponse,
  });
};

const auth = {
  createSendToken,
};

export default auth;
