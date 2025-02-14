import { NextRequest,NextResponse } from "next/server";
import User from "@/models/UserModel";

export async function GET(request:NextRequest){
    const users = await User.find();
    return NextResponse.json({message:"users found",users},{status:200})
}