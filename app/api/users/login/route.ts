import { connectToDatabase } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/UserModel";
import jwt from "jsonwebtoken";

connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "login success",
      success: true,
    },{status: 200});
    response.cookies.set("token", token, {httpOnly: true});

    return response;
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
