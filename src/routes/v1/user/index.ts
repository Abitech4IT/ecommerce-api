import { Router } from "express";
import authRoutes from "./auth.routes";
import productRoutes from "./products.routes";

const userRoutes = Router();

userRoutes.use("/auth", authRoutes);
userRoutes.use("/products", productRoutes);

export default userRoutes;
