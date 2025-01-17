import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import Item from "@/models/ItemModel";
import { connectToDatabase } from "@/dbConfig/dbConfig";

connectToDatabase();

export async function DELETE(request: NextRequest){
    const userId = await getTokenData(request)
    if(userId){
        try {
            await Item.findOneAndDelete({owner: typeof userId === 'string' ? userId : userId.id})
            return NextResponse.json({message:"Item deleted"}, {status:200})
        } catch (error) {
            return NextResponse.json({error:error},{status: 500})
        }
        
    }
}