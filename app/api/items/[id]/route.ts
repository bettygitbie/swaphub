import { connectToDatabase } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Item from "@/models/ItemModel";

connectToDatabase();

export async function PATCH(request:Request){
    const body = await request.json();
    try {
        const updatedItem = await Item.findByIdAndUpdate(body._id, {$set:body});
        return NextResponse.json({message:"Item updated successfully!",updatedItem}); 
    } catch (error) {
        NextResponse.json({error: 'Error updating item'},{status:500})
    }
    
}