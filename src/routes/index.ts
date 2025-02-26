import express from "express";
import v1Routes from "./v1";
import { errorHandler } from "@middlewares/error-handler.middleware";

const apiRoutes = express.Router();

apiRoutes.use("/v1", v1Routes);

apiRoutes.use(errorHandler);

export default apiRoutes;
