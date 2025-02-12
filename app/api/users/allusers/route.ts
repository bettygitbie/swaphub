import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel";
import { connectToDatabase } from "@/dbConfig/dbConfig";

connectToDatabase();

export async function GET(request: NextRequest) {
  try {
    const users = (await User.find().select("-password")).sort();
    if (!users) {
        return NextResponse.json(
          { message: "There are no users!" },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: "Users found", users });
    //const userId = await getTokenData(request);
    //fetch user data without the password
    // if (userId) {
    //   const users = await User.find().select("-password");
    //   if (!users) {
    //     return NextResponse.json(
    //       { message: "There are no users!" },
    //       { status: 404 }
    //     );
    //   }
    //   return NextResponse.json({ message: "Users found", users });
    // } else {
    //     return NextResponse.json({ message: "Users not found! Please sign in!" }, { status: 404 });
    // }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
