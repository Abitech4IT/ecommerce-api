import catchAsync from "@helpers/catchAsync";
import { getUserAuthItems } from "@helpers/userAuthItems";
import OrderItem from "@models/orderItem.model";
import orderService from "@services/order";
import userService from "@services/users";
import { NextFunction, Request, Response } from "express";

export const create = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userAuthItems = getUserAuthItems(req);
    const authenticatedUserId = userAuthItems.userId!;

    // check for authenticated user
    const authenticatedUser = await userService.repo.getUserById(
      userAuthItems.userId!
    );

    if (!authenticatedUser) {
      return next(new Error("Authenticated user not found"));
    }

    const order = await orderService.repo.createOrder(authenticatedUserId);

    if (!order) {
      return next(new Error("Order creation failed"));
    }

    // Send transaction email
    await orderService.sendOrderDetailsEmail({
      firstName: authenticatedUser?.firstName as string,
      lastName: authenticatedUser?.lastName as string,
      email: authenticatedUser?.email as string,
      orderId: order.id,
      orderDate: order.createdAt,
      itemsList: order.orderitems?.map((item: OrderItem) => ({
        productName: item.product.productName,
        price: item.price,
        totalPrice: item.quantity * item.price,
      })),
      totalAmount: order.totalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Created",
      data: order,
    });
  }
);
