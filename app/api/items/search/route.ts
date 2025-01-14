import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import Item from "@/models/ItemModel";

export async function GET(request: NextApiRequest) {
  if (!request.url) {
    return NextResponse.json({ error: "Invalid request URL" }, { status: 400 });
  }
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  try {
    let filteredItems = await Item.find({
      category: category?.toString(),
    }).sort({ createdAt: -1 });
    return NextResponse.json(
      { message: "Search results", filteredItems },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "unable to fetch" }, { status: 401 });
  }
}
