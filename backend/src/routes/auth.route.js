/*** manage authentication routes
 * e.g.:
 * POST /api/auth/register - for user registration
 * POST /api/auth/login - for user login
 * POST /api/auth/logout - for user logout
 * GET /api/auth/profile - for fetching user profile (protected route)
 */

import { Router } from "express";
import { validateRegistration } from "../validator/auth.validator.js";
import { registerController } from "../controller/auth.controller.js";
const router = Router();

//* Registration route */
router.post("/register", validateRegistration, registerController);


//* Login route */
router.post("/login", validateLogin, loginController);

export default router;
