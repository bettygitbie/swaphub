//import { getTokenData } from "@/helpers/getTokenData";
import { NextResponse } from "next/server";
import User from "@/models/UserModel";
import { connectToDatabase } from "@/dbConfig/dbConfig";

connectToDatabase();

export async function GET() {
  try {
    const users = (await User.find().select("-password")).sort();
    if (!users) {
        return NextResponse.json(
          { message: "There are no users!" },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: "Users found", users });
  
  } catch (error) {
    return NextResponse.json({ message: "Error fetching users",error }, { status: 500 });
  }
}
