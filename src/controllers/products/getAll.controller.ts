import { AppError } from "@helpers/appError";
import catchAsync from "@helpers/catchAsync";
import productsService from "@services/products";
import { NextFunction, Request, Response } from "express";

export const getAll = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await productsService.repo.getAllProducts();

    if (!products) {
      return next(new AppError("No products found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Ok",
      data: products,
    });
  }
);
