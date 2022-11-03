import { Router } from "express";
import * as authController from "../controllers/ProductController";


export const productRouter = Router();

productRouter.route("/products").get(authController.getProducts);
productRouter.route("/add-product").post(authController.addProduct);