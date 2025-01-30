import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import PasswordReset from "@/models/PasswordResetModel";

connectToDatabase();

export const sendEmail = async ({ email, emailType, userId }: any) => {
  console.log(userId)
  try {
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined");
    }
    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    //create a log of password reset requests
    const newPasswordRequest = new PasswordReset({
      userId,
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: Date.now() + 3600000,
    });
    console.log(newPasswordRequest)
    const savedRequest = await newPasswordRequest.save();
    console.log(savedRequest);

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "admin@swaphub.com",
      to: email,
      subject:
        emailType === "RESET" ? "Reset your password" : "Verify your email",
      html: `<p>We received a password reset request for your SwapHub account. Click <a 
        href="${
          process.env.DOMAIN
        }/password-reset?token=${token}">here</a> to ${
        emailType === "RESET" ? "reset your password" : "verify your email"
      } or copy and paste the following link on your browser: ${
        process.env.DOMAIN
      }/password-reset?token=${token}</p>`,
    };
    const transportRes = await transport.sendMail(mailOptions);
    return transportRes;
  } catch (error) {
    throw new Error(error);
  }
};
