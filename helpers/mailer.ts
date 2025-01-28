import nodemailer from "nodemailer";
import User from "@/models/UserModel";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'

export const sendEmail = async ({ email, emailType}:any) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined");
    }
    const token = jwt.sign({email}, process.env.SECRET_KEY, {expiresIn: '1h'});
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions={
        from: "admin@swaphub.com",
        to: email,
        subject: emailType==="RESET"?"Reset your password" : "Verify your email",
        html: `<p>We received a password reset request for your SwapHub account. Click <a 
        href="${process.env.DOMAIN}/pwreset?token=${token}">here</a> to ${emailType==="RESET"?
    "reset your password":"verify your email"} or copy and paste the following link on your browser: ${
    process.env.DOMAIN}/pwreset?token=${token}</p>`,
    }
    const transportRes = await transport.sendMail(mailOptions)
    return transportRes;
  } catch (error) {
    throw new Error(error)
  }
};
