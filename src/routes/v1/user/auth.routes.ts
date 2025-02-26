import authController from "@controllers/auth";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/signup", authController.signUp);
authRoutes.post("/login", authController.login);

export default authRoutes;
