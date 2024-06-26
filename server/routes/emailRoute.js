import express from "express";
import { sendEmail } from "../controllers/emailController.js";

const router = express.Router();

// Endpoint to send an email
router.get("/sendemail", sendEmail);

export default router;