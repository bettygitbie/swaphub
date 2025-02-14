import { NextResponse, NextRequest } from "next/server";
import User from "@/models/UserModel";
import Item from "@/models/ItemModel";
import { connectToDatabase } from "@/dbConfig/dbConfig";

connectToDatabase();

export async function DELETE(request:NextRequest) {
    const userId = request.nextUrl.pathname.split('/').pop()
  try {
    await Item.deleteMany({ owner: userId });
    await User.findOneAndDelete({ _id: userId });
    return NextResponse.json(
      { message: "user and items deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "user not found", error }, { status: 403 });
  }
}
