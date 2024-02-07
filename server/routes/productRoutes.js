import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewasare.js";
import {
  braintreeController,
  braintreePaymentController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProduct,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  similarProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

//create product || POST
router.post(
  "/createproduct",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//Get product || get
router.get("/getproduct", getProductController);

//Get Single product || get
router.get("/getproduct/:slug", getSingleProduct);

//Get Photo || get
router.get("/productphoto/:pid", productPhotoController);

//Router.Delete || DELETE
router.delete("/delete/:pid", deleteProductController);

//create product || POST
router.put(
  "/editproduct/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//fiter product || Post
router.post("/productfilter", productFilterController);

// product count || get
router.get("/productcount", productCountController);

// product per page  || get
router.get("/productlist/:page", productListController);

//similar products || get
router.get("/similarproduct/:pid/:cid", similarProductController);

//Payrment route || token
router.get("/braintree/token", braintreeController);

//payment route
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
