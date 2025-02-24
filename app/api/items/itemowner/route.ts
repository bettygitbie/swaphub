import { NextResponse, NextRequest } from "next/server"; 
import User from "@/models/UserModel";

export async function GET(request:NextRequest){
    console.log("Request received at /api/items/itemowner");
    const { searchParams } = new URL(request.url);
    const owner = searchParams.get('owner');
    console.log('owner is', owner);
    if (!owner) {
        return NextResponse.json({ message: 'Owner ID is required' },{status:400});
      }
    const user = await User.findById(owner);

    if(user){
        return NextResponse.json({email: user.email},{status:200})
    }else {
        return NextResponse.json({message:'user not found'},{status:404})
    }
}