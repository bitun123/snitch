/*** manage authentication routes
 * e.g.:
 * POST /api/auth/register - for user registration
 * POST /api/auth/login - for user login
 * POST /api/auth/logout - for user logout
 * GET /api/auth/profile - for fetching user profile (protected route)
 */

import { Router } from "express";
import { config } from "../config/config.js";
import {
  validateLogin,
  validateRegistration,
} from "../validator/auth.validator.js";
import {
  registerController,
  loginController,
  googleCallbackController,
  getProfileController
} from "../controller/auth.controller.js";

import passport from "passport";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { get } from "mongoose";

const router = Router();

//* Registration route */
router.post("/register", validateRegistration, registerController);

//* Login route */
router.post("/login", validateLogin, loginController);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect:
      config.NODE_ENV == "development"
        ? "http://localhost:5173/login"
        : "/login",
  }),
  googleCallbackController,
);




router.get("/profile",authenticateUser,getProfileController)
export default router;
