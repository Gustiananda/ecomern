import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  getListCustomer,
  getDetailCustomer,
  changeVerifyCustomer,
} from "../controllers/authControllers.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//forgot-password
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected-USER route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected-ADMIN route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

router.get("/list-customer", requireSignIn, isAdmin, getListCustomer);

router.get("/detail-customer/:id", requireSignIn, getDetailCustomer);

router.post("/change-verify", requireSignIn, isAdmin, changeVerifyCustomer);

export default router;
