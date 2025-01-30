import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
  },
  { timestamps: true }
);

const PasswordReset = mongoose.models.PasswordReset || mongoose.model("PasswordReset", passwordSchema);

export default PasswordReset;
