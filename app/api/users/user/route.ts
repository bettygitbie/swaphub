import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel";
import { connectToDatabase } from "@/dbConfig/dbConfig";

connectToDatabase();

export async function GET(request: NextRequest) {
  try {
    const userId = await getTokenData(request);
    console.log(userId);
    //fetch user data without the password
    if (userId) {
      const user = await User.findOne({ _id: typeof userId === 'string' ? userId : userId.id }).select("-password");
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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
