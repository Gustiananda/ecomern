import express from "express";
import {
  createOrderController,
  getListAllOrder,
  getListOrderByBuyer,
  orderPhotoController,
  getChangeStatusOrder,
  printReport
} from "../controllers/orderController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const orderRouter = express.Router();

orderRouter.post("/create-orders", requireSignIn, formidable(), createOrderController);
orderRouter.get("/get-by-buyer", requireSignIn, getListOrderByBuyer);
orderRouter.get("/get-by-admin", requireSignIn, isAdmin, getListAllOrder);
orderRouter.get("/get-payment-photo/:pid", orderPhotoController);
orderRouter.post("/change-status", requireSignIn, isAdmin, getChangeStatusOrder);
orderRouter.get("/print-report", requireSignIn, isAdmin, printReport);


export default orderRouter;