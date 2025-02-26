import { AppError } from "@helpers/appError";
import catchAsync from "@helpers/catchAsync";
import Cart from "@models/cart.model";
import userService from "@services/users";
import { createSendToken } from "@services/users/auth-helpers.service";
import { NextFunction, Request, Response } from "express";

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const [validatedData, validationErrors] =
      userService.dataValidation.validateUserSignUpRequest(req);

    if (validationErrors) {
      res.status(400).json({
        status: 400,
        message: "Bad request",
        errors: validationErrors,
      });
      return;
    }

    const body = validatedData.body;

    const exisitingUser = await userService.repo.getUserByEmail(body.email);
    if (exisitingUser) {
      return next(new AppError("Email already exists", 400));
    }

    const user = await userService.repo.signupUser(body);

    // Create a cart for the new user
    await Cart.create({
      userId: user.id,
    });

    createSendToken(user, 201, res);
  }
);
