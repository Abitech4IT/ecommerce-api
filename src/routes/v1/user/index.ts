import { Router } from "express";
import authRoutes from "./auth.routes";
import productRoutes from "./products.routes";
import cartRoutes from "./cart.routes";

const userRoutes = Router();

userRoutes.use("/auth", authRoutes);
userRoutes.use("/products", productRoutes);
userRoutes.use("/carts", cartRoutes);

export default userRoutes;
