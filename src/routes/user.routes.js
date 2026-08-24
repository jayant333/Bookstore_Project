import express from "express";
import { validate } from "../middleware/validate.js";
import { createUserSchema } from "../schemas/user.schema.js";
import { registerUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", validate(createUserSchema), registerUser);

export default router;
