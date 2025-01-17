import { NextRequest,NextResponse } from "next/server";
import Item from "@/models/ItemModel";
import { connectToDatabase } from "@/dbConfig/dbConfig";

connectToDatabase();

export async function GET(request: NextRequest){
    try {
        const items = await Item.find().sort({createdAt: -1})
        return NextResponse.json({ message: "Item found", items});
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}