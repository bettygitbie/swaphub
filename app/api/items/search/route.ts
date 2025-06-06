//import { NextApiRequest} from "next";
import { NextResponse, NextRequest } from "next/server";
import Item from "@/models/ItemModel";

export async function GET(request: NextRequest) {
  if (!request.url) {
    return NextResponse.json({ error: "Invalid request URL" }, { status: 400 });
  }
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q");
  try {
    if (category) {
      const filteredItems = await Item.find({
        category: category?.toString(),
      }).sort({ createdAt: -1 });
      return NextResponse.json(
        { message: "Search results", filteredItems },
        { status: 200 }
      );
    } else if (q) {
      const filteredItems = await Item.find({
        $or: [
          { title: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
        ],
      });
      return NextResponse.json(
        { message: "Search results", filteredItems },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error searching for items", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
