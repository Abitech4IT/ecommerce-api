import productsController from "@controllers/products";
import { Router } from "express";

const productRoutes = Router();

productRoutes.get("/getAllProducts", productsController.getAll);
productRoutes.get("/getOne/:id", productsController.getOne);

export default productRoutes;
