import express from "express";
import userRoutes from "./user";

const v1Routes = express.Router();

v1Routes.use("/", userRoutes);

export default v1Routes;
