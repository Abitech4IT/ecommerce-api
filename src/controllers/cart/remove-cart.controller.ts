import catchAsync from "@helpers/catchAsync";
import { getUserAuthItems } from "@helpers/userAuthItems";
import cartService from "@services/cart";
import { NextFunction, Request, Response } from "express";

export const remove = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userAuthItems = getUserAuthItems(req);
    const authenticatedUserId = userAuthItems.userId!;

    const cartItemId = req.params.id;

    await cartService.repo.removeFromCart(authenticatedUserId, cartItemId);

    res.status(204).json({
      success: true,
      message: "Deleted from cart",
    });
  }
);
