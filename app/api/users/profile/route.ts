import { connectToDatabase } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/UserModel";

connectToDatabase();

export async function PATCH(request:Request){
    const body = await request.json();
    try {
        const updatedItem = await User.findByIdAndUpdate(body._id, {$set:body});
        return NextResponse.json({message:"User updated successfully!",updatedItem}); 
    } catch (error) {
        NextResponse.json({message: 'Error updating user', error},{status:500})
    }
}