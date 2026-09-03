import express from "express";
import { validate } from "../middleware/validate.js";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema.js";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { loginRateLimiter } from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

//create user route
router.post("/register", validate(createUserSchema), registerUser);

//login route
router.post("/login", loginRateLimiter, validate(loginUserSchema), loginUser);
export default router;
