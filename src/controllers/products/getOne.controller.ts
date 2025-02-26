import { AppError } from "@helpers/appError";
import catchAsync from "@helpers/catchAsync";
import productsService from "@services/products";
import { NextFunction, Request, Response } from "express";

export const getOne = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await productsService.repo.getProductById(req.params.id);

    if (!product) {
      return next(new AppError("No products found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Ok",
      data: product,
    });
  }
);
