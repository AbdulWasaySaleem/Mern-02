import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddlewasare.js";
import {
  categoryController,
  createCategoryController,
  deletecategory,
  singlecategory,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//routes
//Create
router.post(
  "/createcategory",
  requireSignIn,
  isAdmin,
  createCategoryController
);
//update
router.put(
  "/updatecategory/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);
//All category  get
router.get("/allcategory", categoryController);
//GEt Single category
router.get("/singlecategory/:slug", singlecategory);
//delete Single category
router.delete("/deletecategory/:id", requireSignIn, isAdmin, deletecategory);

export default router;
