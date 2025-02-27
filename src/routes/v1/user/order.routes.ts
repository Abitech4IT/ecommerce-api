import orderController from "@controllers/order";
import { authenticate } from "@middlewares/user-auth.middleware";
import { Router } from "express";

const orderRoute = Router();

orderRoute.post("/create", authenticate, orderController.create);

export default orderRoute;
