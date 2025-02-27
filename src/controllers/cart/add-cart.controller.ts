import catchAsync from "@helpers/catchAsync";
import { getUserAuthItems } from "@helpers/userAuthItems";
import cartService from "@services/cart";
import { NextFunction, Request, Response } from "express";

export const add = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userAuthItems = getUserAuthItems(req);
    const authenticatedUserId = userAuthItems.userId!;

    const [validatedData, validationErrors] =
      cartService.dataValidation.validateAddToCartRequest(req);

    if (validationErrors) {
      res.status(400).json({
        status: 400,
        message: "Bad request",
        errors: validationErrors,
      });
      return;
    }

    const body = validatedData.body;

    const cart = await cartService.repo.addCart(
      authenticatedUserId,
      body.productId,
      body.quantity
    );

    res.status(201).json({
      success: true,
      message: "Created",
      data: cart,
    });
  }
);
