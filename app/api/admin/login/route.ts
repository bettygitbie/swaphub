import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createAdmin } from "@/helpers/createAdmin";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  const admin = await createAdmin();
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password required" },
        { status: 404 }
      );
    }
    const validate = await bcryptjs.compare(password, admin.password);
    if (!validate) {
      return NextResponse.json(
        { message: "incorrect password" },
        { status: 403 }
      );
    }
    const tokenData = {
      username: username,
      email: admin.email,
    };
    const token = jwt.sign(tokenData, process.env.ADMIN_SECRET_KEY!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "login success",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    return NextResponse.json({ message:"Internal server error", error }, { status: 500 });
  }
}
