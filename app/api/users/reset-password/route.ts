import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "@/models/UserModel";
import PasswordReset from "@/models/PasswordResetModel";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { token, password } = reqBody;

  if (!token || !password) {
    return NextResponse.json(
      { message: "Token and password are required" },
      { status: 400 }
    );
  }
  //Fetch the record for the user password reset
  const passwordRequest = await PasswordReset.findOne({
    forgotPasswordToken: token,
  });
  if(!passwordRequest){
    return NextResponse.json({
        message: "No token saved. Try again!"
    }, {status: 404})
  }

  try {
    if (!process.env.SECRET_KEY) {
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log("decoded token:", decodedToken);
    const { email } = decodedToken;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    passwordRequest.forgotPasswordToken = undefined;
    passwordRequest.forgotPasswordTokenExpiry = undefined;
    await passwordRequest.save()

    return NextResponse.json(
      { message: "Password reset success!", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" , error},
      { status: 400 }
    );
  }
}
