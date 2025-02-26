import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";

connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    console.log("Found user", user);

    await sendEmail( email, "RESET", user._id );
    return NextResponse.json(
      { message: "Success email sent" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error sending email", error },
      { status: 500 }
    );
  }
}
