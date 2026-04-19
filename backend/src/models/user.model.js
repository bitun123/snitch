import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide a username"],
      Trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      Trim: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Password is required only if googleId is not present
      },
      minlength: [6, "Password must be at least 6 characters long"],
    },
    phone: {
      type: String,
      required: [false],
    },
    role: {
      type: String,
      enum: ["buyer", "seller"],
      default: "buyer",
    },
    googleId: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);
export default userModel;
