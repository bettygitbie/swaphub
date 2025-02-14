import { NextResponse } from "next/server";
import Item from "@/models/ItemModel";
import { connectToDatabase } from "@/dbConfig/dbConfig";

connectToDatabase();

export async function GET(){
    try {
        const items = await Item.find().sort({createdAt: -1})
        return NextResponse.json({ message: "Item found", items});
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}