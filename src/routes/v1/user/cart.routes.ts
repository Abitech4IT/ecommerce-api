import cartController from "@controllers/cart";
import { authenticate } from "@middlewares/user-auth.middleware";
import { Router } from "express";

const cartRoutes = Router();

cartRoutes.post("/addCart", authenticate, cartController.add);
cartRoutes.delete("/deleteCart/:id", authenticate, cartController.remove);

export default cartRoutes;
