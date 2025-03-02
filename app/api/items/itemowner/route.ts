import { NextResponse, NextRequest } from "next/server";
import User from "@/models/UserModel";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const owner = searchParams.get("owner");

  if (!owner) {
    return NextResponse.json(
      { message: "Owner ID is required" },
      { status: 400 }
    );
  }
  try {
    const user = await User.findById(owner);
    if (user) {
      return NextResponse.json({ email: user.email }, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
