import { AppError } from "@helpers/appError";
import catchAsync from "@helpers/catchAsync";
import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import { DecodedToken } from "./types";
import User from "@models/user.model";

interface CustomRequest extends Request {
  user?: User;
  userAuthItems?: {
    loggedIn: boolean;
    token?: string;
    user?: User;
    userId?: string;
  };
}

export const authenticate = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    let token;

    // Extract token from header or cookies
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }

    // Verify token
    const decoded = await new Promise<DecodedToken>((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET || "", (err, decoded) => {
        if (err) reject(err);
        resolve(decoded as DecodedToken);
      });
    });

    // Check if user exists
    const currentUser = await User.findOne({ where: { id: decoded.userId } });
    if (!currentUser) {
      return next(
        new AppError("The user belonging to this token no longer exists.", 401)
      );
    }

    // Attach userAuthItems to request
    req.user = currentUser;
    req.userAuthItems = {
      loggedIn: true,
      token,
      user: currentUser,
      userId: currentUser.id,
    };

    next();
  }
);
