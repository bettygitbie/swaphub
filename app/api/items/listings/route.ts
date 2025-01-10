import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import Item from "@/models/ItemModel";
import { connectToDatabase } from "@/dbConfig/dbConfig";

connectToDatabase();

export async function GET(request: NextRequest) {
  try {
    const userId = await getTokenData(request);
    console.log(userId);
    //fetch user data without the password
    if (userId) {
      const item = await Item.find({ owner: typeof userId === 'string' ? userId : userId.id });
      if (!item) {
        return NextResponse.json(
          { message: "No item for user!" },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: "Item found", item });
    } else {
        return NextResponse.json({ message: "User not found! Please sign in!" }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
