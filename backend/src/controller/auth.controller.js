import userModel from "../models/user.model.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

async function withSendTokenResponse(user, res) {
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
}

export const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or phone number already in use" });
    }

    await userModel.create({
      userName,
      email,
      password,
      phone,
    });

    cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error in registerController:", error);
    res.status(500).json({ message: "Server error" });
  }
};
