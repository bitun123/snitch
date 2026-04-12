import userModel from "../models/user.model.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

// helper function to send response
async function withSendTokenResponse(user, res, message) {
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: message,
    success: true,
    token,
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
      phone: user.phone,
    },
  });
}

// register controller
export const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, isSeller } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or phone number already in use" });
    }

    const user = await userModel.create({
      userName,
      email,
      password,
      phone,
      role: isSeller ? "seller" : "buyer",
    });

    await withSendTokenResponse(user, res, "User registered successfully");
  } catch (error) {
    console.error("Error in registerController:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//Login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid password",
        success: false,
      });
    }

    await withSendTokenResponse(user, res, "User logged in successfully");
  } catch (error) {
    console.error("Error in loginController:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Google OAuth callback controller
export const googleCallbackController = async (req, res) => {
  try {
    const { id, displayName, emails, photos } = req.user;

    const email = emails[0].value;
    const photo = photos[0].value;

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        userName: displayName,
        email,
        googleId: id,
        // Optionally, you can store the profile picture URL in the user model
        // profilePicture: photo,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token);

    res.redirect("http://localhost:5173/");
  } catch (error) {
    throw new Error("Google authentication failed: " + error.message);
  }
};
