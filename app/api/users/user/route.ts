import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel";
import { connectToDatabase } from "@/dbConfig/dbConfig";

connectToDatabase();

export async function GET(request: NextRequest) {
  try {
    const userId = await getTokenData(request);
    //fetch user data without the password
    if (userId && (typeof userId === 'string' || (typeof userId === 'object' && 'id' in userId))) {
      const ownerId = typeof userId === 'string' ? userId : userId.id;
      const user = await User.findOne({ _id: ownerId }).select("-password");

      if (!user) {
        return NextResponse.json(
          { message: "User not found! Please sign in!" },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: "User found", user });
    } else {
        return NextResponse.json({ message: "User not found! Please sign in!" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message:"Internal server error", error }, { status: 500 });
  }
}
