import { NextRequest, NextResponse } from "next/server";
import Item from "@/models/ItemModel";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import { getTokenData } from "@/helpers/getTokenData";
import { writeFile } from "fs/promises";
import { join } from "path";

connectToDatabase();


export async function POST(request: NextRequest) {
  const formData = await request.formData();
  for (const [key, value] of formData.entries()) {
    console.log(`FD ${key}: ${value}`);
  }
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const location = formData.get("location") as string;
  const category = (formData.get("category") as string).toLowerCase();
  const image: File | null = formData.get("image") as File;

  const token = await getTokenData(request);
  //console.log(token);
  if (!token || typeof token === "string") {
    return NextResponse.json("You must be logged in to create a listing");
  }
  if (!title || !description || !price) {
    return NextResponse.json("Missing required fields");
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const updatedImageName = Date.now() + image.name;

  const imageURL = join("./", "uploads", updatedImageName);
  await writeFile(imageURL, buffer);
  try {
    const newItem = new Item({
      title,
      description,
      price,
      location,
      category,
      owner: token.id,
      image: updatedImageName,
    });

    const item = await newItem.save();
    return NextResponse.json(
      { message: "Item created successfully", item },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
  
}
