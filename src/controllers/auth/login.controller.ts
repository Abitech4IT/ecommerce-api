import { AppError } from "@helpers/appError";
import catchAsync from "@helpers/catchAsync";
import userService from "@services/users";
import { createSendToken } from "@services/users/auth-helpers.service";
import { NextFunction, Request, Response } from "express";

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const [validatedData, validationErrors] =
      userService.dataValidation.validateLoginRequest(req);

    if (validationErrors) {
      res.status(400).json({
        status: 400,
        message: "Bad request",
        errors: validationErrors,
      });
      return;
    }

    const body = validatedData.body;

    const user = await userService.repo.getUserByEmailAndPassword(
      body.email,
      body.password
    );

    if (!user) {
      return next(new AppError("incorrect email or password", 401));
    }

    createSendToken(user, 200, res);
  }
);
