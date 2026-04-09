import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export const validateRegistration = [
  body("userName")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters")
    .notEmpty()
    .withMessage("Username is required"),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .notEmpty()
    .withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, and one digit",
    )
    .notEmpty()
    .withMessage("Password is required"),
  body("phone")
    .isMobilePhone()
    .withMessage("Please provide a valid phone number")
    .matches(/^\d{10}$/)
    .withMessage("Phone number must be 10 digits long")
    .notEmpty()
    .withMessage("Phone number is required"),

  validateRequest,
];

export const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .notEmpty()
    .withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),

  validateRequest,
];
