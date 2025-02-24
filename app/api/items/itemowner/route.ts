import { NextResponse } from "next/server"; 
import { NextApiRequest } from "next";
import User from "@/models/UserModel";

export async function GET(request:NextApiRequest){
    console.log("Request received at /api/items/itemowner");
    const {owner} = request.query;
    console.log(request.query)
    console.log('owner is',owner)
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