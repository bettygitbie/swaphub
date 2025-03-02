import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({message: "Logout success", success: true});

    response.cookies.set("token", "", {
      maxAge: 0,
      path: "/",
    });
    return response;
  } catch (error) {
  
    return NextResponse.json({ message: "Unknown error", error }, { status: 500 });
  }
}
 