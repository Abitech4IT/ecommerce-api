import { Router } from "express";
import authRoutes from "./auth.routes";
import productRoutes from "./products.routes";
import cartRoutes from "./cart.routes";
import orderRoute from "./order.routes";

const userRoutes = Router();

userRoutes.use("/auth", authRoutes);
userRoutes.use("/products", productRoutes);
userRoutes.use("/carts", cartRoutes);
userRoutes.use("/order", orderRoute);

export default userRoutes;
